import koa_router from 'koa-router';

const router = koa_router();

router.prefix('/photo');

router.get('/', async ctx => {
    ctx.type = 'text/html';
    ctx.body = 'photo'
});

export default router;