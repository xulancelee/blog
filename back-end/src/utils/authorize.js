import security from './security.js';

const authMap = {
    level: {
        '': 0,
        guest: 1,
        user: 2,
        vip: 3,
        staff: 4,
        manager: 5,
        administrator: 6,
        developer: 7
    },
    api: {
        auth: 5,
        home: 0,
        journal: 0,
        sign: 0,
        platform: {
            root: 0
        }
    }
};

function getLevel(group) {
    return authMap.level[group] || 0;
}

function checkAuth(path, level) {
    let apiPath = path.slice(1).split('/');
    let api = authMap.api;
    let index = 0;
    while (typeof api !== "number" && typeof api !== "undefined") {
        api = api[apiPath[index]];
        if(index === apiPath.length - 1 && typeof api === "object") api = api['root'];
        index++;
    }
    api = api || 0;
    console.log(api);
    return level >= api;
}

export default async (ctx, next) => {
    try {
        let token = ctx.header.authorization;
        let path = ctx.url;
        let auth = 0;
        ctx.scope = ctx.scope || {};
        console.log(path);
        if (token) {
            let [header, payload, signature] = token.split('.');
            let {exp, uid, name, group} = security.decodeTSL(signature, payload);
            let now = new Date().getTime();
            if (now > exp) {
                ctx.status = 302;
                return ctx.body = {data: '/sign', result: false, message: 'Authorize Expired!', code: 302};
            }
            console.log(group);
            ctx.scope['user'] = uid;
            ctx.scope['username'] = name;
            auth = getLevel(group);
        }
        ctx.scope['auth'] = auth;
        if (!checkAuth(path, auth)) {
            ctx.status = 401;
            return ctx.body = {data: '/sign', result: false, message: 'Not Authorize Request!', code: 401};
        } else await next();

    } catch (e) {
        console.log(e);
    }

};