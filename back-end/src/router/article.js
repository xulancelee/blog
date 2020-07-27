import koa_router from 'koa-router';
import controller from "../controller/articleController.js";
import {render} from "../utils/view-engine.js";
import marked from "marked";
import highlight from "highlight.js";

marked.setOptions({
    highlight: function (code, lang) {
        return highlight.highlight(lang, code, false, null).value;
    }
});

const router = koa_router();
router.prefix('/article');

router.get('/*', async (ctx) => {
    let link = ctx.params[0];
    let scope = ctx.scope || {};
    let info = await controller.articleDetail(link);
    if (!info) return ctx.status = 404;
    let source = await controller.articleContent(info.link, info.ext);
    let content = '';
    if(source) {
        content = info.ext === '.md' ? marked(source) : source;
    } else {
        content = '404 Not Fount!';
    }
    let props = {
        info,
        content
    };
    scope['title'] = (info.title + ' - ' || '') + '飞夕言';
    ctx.type = 'text/html';
    ctx.body = await render('page.article', scope, props);
});

export default router;