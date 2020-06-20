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
        home: 0,
        journal: 0,
        sign: 0,
        manage: 5
    }
};

function checkAuth(path, group) {
    let lv = authMap.level[group];
    let apiPath = path.split('/');
    console.log(apiPath);
}

export default async (ctx, next) => {
    try {
        let token = ctx.header.authorization;
        let path = ctx.url;
        let auth = 0;
        if(token) {
            let [header, payload, signature] = token.split('.');
            let {exp, uid, name, group} = security.decodeTSL(signature, payload);
            let now = new Date().getTime();
            let handle = 0;
            if (now > exp) handle = 1;

        }

        // if (!checkAuth(path, auth)) handle = 2;
        console.log(auth);
    } catch (e) {
        console.log(e);
    }
    await next();
};