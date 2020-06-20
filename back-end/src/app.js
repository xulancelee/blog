import path from 'path';
import Koa from 'koa';
import koa_json from 'koa-json';
import koa_static from 'koa-static';
import koa_parser from 'koa-bodyparser';
import authorize from './utils/authorize.js';

import home from './router/home.js';
import journal from './router/journal.js';
import photo from './router/photo.js';

const app = new Koa();

app.use(koa_json());
app.use(koa_static(path.resolve('./src/public')));
app.use(authorize);
app.use(koa_parser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(async (ctx, next) => {
    await next();
    let data = ctx.body;
    let code = ctx.status;
    let type = ctx.type;
    if (data)
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
    else ctx.status = 404;
});
app.on('error', async (err, ctx) => {
    ctx.res.writeHead(200, {
        'content-Type': 'application/json'
    });
    ctx.res.end(JSON.stringify({result: false, code: 502, message: 'server error!'}));
});

app.use(home.routes());
app.use(home.allowedMethods());
app.use(journal.routes());
app.use(journal.allowedMethods());
app.use(photo.routes());
app.use(photo.allowedMethods());

export default app;