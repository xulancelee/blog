import koa_router from 'koa-router';
import security from "../utils/security.js";
import controller from "../controller/homeController.js";
import {render} from '../utils/view-engine.js';
import marked from "marked";
import highlight from "highlight.js";

marked.setOptions({
    highlight: function (code, lang) {
        return highlight.highlight(lang, code, false, null).value;
    }
});

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
    let callbackName = ctx.query['callback'];
    let tags = ['news', 'article', 'video', 'blog'];
    let index = Math.floor(Math.random() * 3);
    let page = Math.floor(Math.random() * 100000);
    let enc = Math.random() * 1000 < 3 ? 1 : 0;
    let elc = enc > 0 ? 2 : 0;
    let pr = enc > 0 ? Math.floor(Math.random() * 100 + 1000).toString() : '';
    ctx.type = 'text/javascript';
    ctx.body = callbackName + '(' + JSON.stringify({
        vl: `http://www.dgms888.com/${tags[index]}/${page}.html`,
        app: '1110304293',
        pos: '3001101761730752',
        elc: elc,
        enck: enc,
        pr_id: pr
    }) + ')';
});

router.get('/resume*', async (ctx) => {
    let link = ctx.params[0];
    let scope = ctx.scope || {};
    let source = await controller.resumeContent(link);
    let content = '404 Not Found';
    if(source) {
        content = marked(source);
    }
    let props = {
        content
    };
    scope['title'] = '个人简历 - 飞夕言';
    ctx.type = 'text/html';
    ctx.body = await render('page.resume', scope, props);
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

function fn (a, ...b) {

}

export default router;

