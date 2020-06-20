import koa_router from 'koa-router';

const router = koa_router();

router.prefix('/manage');

router.get('/', async ctx => {
    ctx.type = 'text/html';
    ctx.body = 'manage'
});

export default router;