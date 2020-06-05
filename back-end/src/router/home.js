import koa_router from 'koa-router';
import marked from 'marked';
import highlight from 'highlight.js';

const router = koa_router();

marked.setOptions({
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
});

router.get('/', async (ctx) => {
    ctx.render('../view/index.html');
});

router.get('/md', async (ctx) => {
    ctx.type = 'text/html';
    ctx.body = marked('# blog\n' +
        'xulance personal web blog site.\n' +
        '\n' +
        '### File Tree\n' +
        '##### Back End\n' +
        '-- package.json\n' +
        '\n' +
        '##### Front End\n' +
        '-- package.json\n' +
        '\n' +
        '```js\n' +
        'function a() {\n' +
        '    console.log(111);\n' +
        '    \n' +
        '}\n' +
        '```');
});

router.get('/question', async (ctx) => {
    ctx.render('../view/question.html');
});

export default router;

