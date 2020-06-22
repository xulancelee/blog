import koa_router from 'koa-router';
import {render} from "../utils/view-engine.js";

const router = koa_router();

router.prefix('/platform');

router.get('/', async ctx => {
    let scope = {
        title: '发布新文章 - 飞夕言'
    };
    let props = {};
    ctx.type = 'text/html';
    ctx.body = await render('platform.publish', scope, props);
});



export default router;