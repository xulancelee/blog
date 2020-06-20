import koa_router from 'koa-router';
import security from "../utils/security.js";
import marked from 'marked';
import highlight from 'highlight.js';
import {render} from '../utils/view-engine.js';

const router = koa_router();

marked.setOptions({
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
});

router.get('/', async (ctx) => {
    let scope = {
        title: '飞夕言'
    };
    let props = {};
    ctx.type = 'text/html';
    ctx.body = await render('page.home', scope, props);
});

router.get('/sign', async (ctx) => {

});

router.get('/sign/in', async (ctx) => {
    let loginToken = ctx.request.body['token'];
    let userInfo = {
        name: 'xulance',
        auth: 'developer'
    };

    if (userInfo) {
        let now = new Date();
        let header = {alg: 'base-crypt', typ: 'jwt'};
        let payload = {
            exp: now.setHours(now.getHours() + 6),
            name: userInfo['name'],
            auth: userInfo['auth']
        };
        let signature = security.createPublicKey();
        let token = [
            security.encodeTSL(signature, header),
            security.encodeTSL(signature, payload),
            signature
        ].join('.');

        ctx.body = {
            name: userInfo['name'],
            auth: userInfo['auth'],
            token: token
        };
    } else {
        ctx.body = 'Unknown user or wrong password!';
    }
});

export default router;

