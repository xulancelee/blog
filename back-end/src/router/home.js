import koa_router from 'koa-router';

const router = koa_router();

router.get('/', async (ctx) => {
    ctx.render('../view/index.html');
});

export default router;

