import path from 'path';
import Koa from 'koa';
import koa_json from 'koa-json';
import koa_views from 'koa-views';
import koa_static from 'koa-static';
import koa_parser from 'koa-bodyparser';

import home from './router/home.js';

const app = new Koa();

console.log(path.resolve('./'));

app.use(koa_json());
app.use(koa_views(path.resolve('./src/view')));
app.use(koa_static(path.resolve('./src/public')));
app.use(koa_parser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(async (ctx, next) => {
    await next();
    let data = ctx.body;
    let code = ctx.status;
    let type = ctx.type;
    switch (code) {
        case 301:
        case 302:
            ctx.redirect(data);
            break;
        case 401:
            ctx.body = {data: null, result: false, message: 'Not Authorize Request!', code: 401};
            break;
        case 200:
        default:
            if (typeof data === 'string') {
                if (type && type.indexOf('text') >= 0) break;
                ctx.body = {data: null, result: false, message: data, code: 200};
            } else ctx.body = {data: data, result: true, message: 'ok', code: 200};
    }
});
app.on('error', async (err, ctx) => {
    ctx.res.writeHead(200, {
        'content-Type': 'application/json'
    });
    ctx.res.end(JSON.stringify({result: false, code: 502, message: 'server error!'}));
});

app.use(home.routes());
app.use(home.allowedMethods());

export default app;