import koa_router from 'koa-router';
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
        title: '飞夕说'
    };
    let props = {};
    ctx.type = 'text/html';
    ctx.body = await render('page.home', scope, props);
});

//id int auto_increment,
// 	link varchar(64) not null,
// 	title varchar(64) null,
// 	description varchar(1024) null,
// 	preview_img varchar(256) null,
// 	ext varchar(16) null,
// 	type varchar(16) null,
// 	tag varchar(256) null,
// 	create_date datetime null,
// 	modify_date datetime null

// router.get('/md', async (ctx) => {
//     ctx.type = 'text/html';
//     ctx.body = marked('# blog\n' +
//         'xulance personal web blog site.\n' +
//         '\n' +
//         '### File Tree\n' +
//         '##### Back End\n' +
//         '-- package.json\n' +
//         '\n' +
//         '##### Front End\n' +
//         '-- package.json\n' +
//         '\n' +
//         '```js\n' +
//         'function a() {\n' +
//         '    console.log(111);\n' +
//         '    \n' +
//         '}\n' +
//         '```');
// });
//
// router.get('/question', async (ctx) => {
//     ctx.render('../view/question.html');
// });
//
// router.get('/engine',  async (ctx, next) => {
//
// });
export default router;

