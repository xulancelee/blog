import koa_router from 'koa-router';

const router = koa_router();

router.prefix('/journal');

router.get('/', async ctx => {
    ctx.type = 'text/html';
    ctx.body = 'journal'
});

export default router;