import koa_router from 'koa-router';
import {render} from "../utils/view-engine.js";
import controller from "../controller/platformController.js";

const router = koa_router();

router.prefix('/platform');

router.get('/', async ctx => {
    let scope = ctx.scope || {};
    let props = {};
    scope['title'] = '发布新文章 - 飞夕言';
    ctx.type = 'text/html';
    ctx.body = await render('platform.publish', scope, props);
});

router.get('/resource', async ctx => {
    let scope = ctx.scope || {};
    let props = {};
    scope['title'] = '资源管理 - 飞夕言';
    ctx.type = 'text/html';
    ctx.body = await render('platform.resource', scope, props);
});

router.get('/list*', async ctx => {
    ctx.body = await controller.listSource(ctx.params[0]);
});

router.post('/upload', async ctx => {
    let save = controller.saveDir('journal');
    let form = await controller.multiParse(ctx.req, save, true, 'link');

    return ctx.body = form;
});

router.post('/publish', async ctx => {
    ctx.type = 'application/json';
    let save = controller.saveDir('journal');
    let form = await controller.multiParse(ctx.req, save, true, 'link');
    let file = form.files[0];
    if (!file.success) return ctx.body = 'File save fail!';
    let result = await controller.publish([
        form['link'],
        form['title'],
        form['description'],
        form['image'],
        file['ext'],
        form['type'],
        form['tag'],
        form['private'] * 1
    ]);
    if (result) return ctx.body = form;
    return ctx.body = "Insert article fail!";
});

export default router;