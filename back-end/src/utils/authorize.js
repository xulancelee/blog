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
    auth: {
        home: 0,
        journal: 0,
        sign: 0,
        resume: 0,
        platform: 5
    },
    type: {
        home: 'page',
        journal: 'page',
        sign: {
            _: 'page',
            in: 'api'
        },
        platform: {
            _: 'page',
            resource: 'page',
            list: 'api'
        }
    }
};

function getLevel(group) {
    return authMap.level[group] || 0;
}

function getHandler(path) {
    let apiPath = path.slice(1).split('/');
    let type = authMap.type;
    let index = 0;
    while (type && typeof type !== "string") {
        type = type[apiPath[index]];
        if (index === apiPath.length - 1 && typeof type === "object") type = type['_'];
        index++;
    }
    type = typeof type === 'string' ? type : type && type['_'] ? type['_'] : 'api';
    return type;
}

function checkAuth(path, level) {
    let apiPath = path.slice(1).split('/');
    let auth = authMap.auth;
    let index = 0;
    while (typeof auth !== "number" && typeof auth !== "undefined") {
        auth = auth[apiPath[index]];
        if (index === apiPath.length - 1 && typeof auth === "object") auth = auth['root'];
        index++;
    }
    auth = auth || 0;
    return level >= auth;
}

export default async (ctx, next) => {
    const notAuthHandle = (path, message) => {
        let handler = getHandler(path);
        switch (handler) {
            case 'page':
                ctx.status = 302;
                ctx.redirect('/sign');
                break;
            case 'api':
            default:
                ctx.status = 401;
                ctx.body = {data: '/sign', result: false, message: message, code: 401};
                break;
        }
    };
    try {
        let token = ctx.header.authorization || ctx.cookies.get('token');
        let path = ctx.url;
        let auth = 0;
        ctx.scope = ctx.scope || {};
        if (token && token.toString() !== 'null') {
            let [header, payload, signature] = token.split('.');
            let {exp, name, role} = JSON.parse(security.decodeTSL(signature, payload));
            let now = new Date().getTime();
            if (now > exp) {
                ctx.status = 302;
                return ctx.redirect('/sign');
            }
            ctx.scope['role'] = role;
            ctx.scope['username'] = name;
            auth = getLevel(role);
        }
        ctx.scope['auth'] = auth;
        if (checkAuth(path, auth)) await next();
        else return notAuthHandle(path, 'Not Authorize Request!');
    } catch (e) {
        return notAuthHandle(path, 'Error Authorize Token!');
    }
};