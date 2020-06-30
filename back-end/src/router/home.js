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

