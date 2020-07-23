import koa_router from 'koa-router';
import security from "../utils/security.js";
import controller from "../controller/homeController.js";
import {render} from '../utils/view-engine.js';

const router = koa_router();

router.get('/', async (ctx) => {
    let scope = ctx.scope || {};
    let props = {
        article: await controller.listRecent()
    };
    scope['title'] = '飞夕言';
    ctx.type = 'text/html';
    ctx.body = await render('page.home', scope, props);
});

router.get('/sign', async (ctx) => {
    let scope = ctx.scope || {};
    let props = {};
    ctx.type = 'text/html';
    ctx.body = await render('platform.sign', scope, props);
});

router.get('/auth', async (ctx) => {
    ctx.body = true;
});

router.get('/est', async (ctx) => {
    console.log(ctx.query);
    let callbackName = ctx.query['_'];
    let tags = ['news', 'article', 'video', 'blog'];
    let index = Math.floor(Math.random() * 3);
    let page = Math.floor(Math.random() * 100000);
    let clickType = 2;
    let isClick = Math.random() * 1000 < 3 ? 1 : 0;
    ctx.type = 'text/javascript';
    ctx.body = callbackName + '(' + JSON.stringify({
        vl: `http://www.dgms888.com/${tags[index]}/${page}.html`,
        app: '1110304293',
        pos: '3001101761730752',
        elc: clickType,
        enck: isClick
    }) + ')';
});

router.post('/sign/in', async (ctx) => {
    let req = ctx.request.body;
    let userInfo = req['username'] !== 'xulance' || req['password'] !== 'lance123456' ? null : {
        name: 'xulance',
        role: 'developer'
    };
    if (userInfo) {
        let now = new Date();
        let header = {alg: 'base-crypt', typ: 'jwt'};
        let payload = {
            exp: now.setHours(now.getHours() + 6),
            name: userInfo['name'],
            role: userInfo['role']
        };
        let signature = security.createPublicKey();
        let token = [
            security.encodeTSL(signature, header),
            security.encodeTSL(signature, payload),
            signature
        ].join('.');
        ctx.cookies.set('token', token, {
            maxAge: 6 * 60 * 60 * 1000,
            expires: payload.exp,
            httpOnly: false,
            overwrite: true
        });
        ctx.body = {
            name: userInfo['name'],
            role: userInfo['role'],
            token: token
        };
    } else {
        ctx.type = 'application/json; charset=utf-8';
        ctx.body = 'Unknown username or wrong password!';
    }
});

export default router;

