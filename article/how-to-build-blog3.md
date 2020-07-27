[title]: <> (怎么搭一个博客：Koa2搭建一个简单的博客后端)
[description]: <> (搭载完环境之后，我们就可以开始设计数据库和搭建一个简单后端服务了)

![封面图](http://xulance.com/resource/202007/ifc-hk.jpg)
>封面图 来自[Bing壁纸](https://bing.ioliu.cn)

## 数据库的创建和设计  
首先我们要考虑的就是文章保存方式的问题，像传统的存储方式一般都是把文章内容的html或者其他格式文本内容存储在数据库内，
但是我觉得如果是编写Markdown文件的话，直接存文件会比较好，我们也可以通过github等方式直接push新文件来进行文章的修正，
然后存储文件的话，我们也需要利用数据库来进行一些文章信息内容的存储，然后还可以拓展内容，例如增加评论模块等。  

所以我有两个简单表格，文章表和评论表，但是评论的话我会根据进度和必要性来考虑是否会增加模块功能。  

#### 文章表
```sql
create table article
(
    id          int auto_increment primary key,
    link        varchar(64)       null,
    title       varchar(64)       null,
    description varchar(255)      null,
    image       varchar(255)      null,
    ext         varchar(16)       null,
    type        varchar(16)       null,
    tag         varchar(64)       null,
    private     tinyint default 0 null,
    create_date datetime          null,
    modify_date datetime          null,
    constraint article_link_uindex
        unique (link)
)
    charset = utf8mb4;
```

#### 评论表
```sql
create table reply
(
    article_id  int               null,
    id          int               not null,
    reader      varchar(64)       null,
    email       varchar(64)       null,
    url         varchar(64)       null,
    content     varchar(512)      null,
    shown       tinyint default 1 null,
    commit_date datetime          null
)
    charset = utf8mb4;
```

数据库编码我用了 `utf8mb4`，其他编码会有不能存储中文的问题，建议使用utf8系列编码，区别可以自己查一下百度

#### 存储过程
我一般都习惯是编写存储过程，然后后端通过调用存储过程来进行数据库操作，这样可以集合多次操作，
减少对数据库的操作次数，有效提升性能。

写一个例子，可以根据例子来理解存储过程，有兴趣的可以深入学习，我也只是学了皮毛的内容，只会一些简单的内容


```sql
#article_add 根据文章link获取文章详细信息
create
    definer = root@`%` procedure article_add(IN _link varchar(64),
                                             IN _title varchar(64),
                                             IN _description varchar(1024),
                                             IN _image varchar(256),
                                             IN _ext varchar(16),
                                             IN _type varchar(16),
                                             IN _tag varchar(64),
                                             IN _private tinyint)
begin
    insert article (link, title, description, image, ext, type, tag, private, create_date, modify_date)
    values (_link, _title, _description, _image, _ext, _type, _tag, _private, now(), now());
end;
```

## 基础后端框架设计
后端的话，是Nodejs来编写，其实如果是会其他后端语言的话，可以不用看了，因为我也是个小菜鸡前端而已，
大神太多值得我学习的很多。  
然后我选择的框架是Koa2，还有很多不错的Nodejs框架值得我去学习的，但是我比较喜欢Koa的中间件的模式，
对于写一些简单的接口是十分不错的，对于express和koa的优缺点我也没有去实际对比过，因为我没用过express，
所以就选了Koa。  
然后前端的话，我考虑很多，因为也是在学习阶段，所以探索了不少方案，原本我是想用React来构建的，
但是考虑到搜索引擎可能会爬不到单页面应用的内容没有办法做SEO优化等，就去探寻其他的解决方案了，
然后也有去了解了React的SSR方案和NextJs的方案，在尝试进行项目构建之后，还是存在一些问题，
最终还是没有选择React的方案。  
然后就是还是选择了Koa模版渲染的方式，然后模版方案的话，因为现存的模版方案Jade、pug、ejs等都不是我喜欢的语法类型，
而且没办法进行模版扩展复用，所以不是很理想，所以我就自己实现了一个模版引擎，这个会在后面单独写一个文章。  

利用脚手架搭建一个Koa2项目,项目目录如下  
```
├── index.js            //入口文件
├── package-lock.json
├── package.json
└── src
    ├── app.config.js   //配置
    ├── app.js          //应用，公共中间件
    ├── article         //文章.md文件保存在这
    ├── controller      //控制器层
    ├── public          //公共资源文件夹
    ├── router          //路由
    ├── utils           //工具库
    └── view            //页面模版
```

##### index.js 
的内容就是脚手架的入口内容，没有修改，可以在这里修改端口号。  

##### app.js 
路由的引用、公共中间件的引用、接口统一化等内容写在这里,用v12以上的Nodejs支持 `import` 语法。  
以下是示例文件，可根据自己的实际需求添加逻辑
```javascript
import path from 'path';
import Koa from 'koa';
import koa_json from 'koa-json'; //表单json格式化
import koa_static from 'koa-static'; //静态资源中间件
import koa_parser from 'koa-bodyparser'; //对表单格式化，支持文件表单

import article from './router/article.js';

const app = new Koa();

app.use(koa_json());
app.use(koa_static(path.resolve(config.staticDir)));
app.use(koa_parser({
    enableTypes: ['json', 'form', 'text']
}));
//统一化对外接口
app.use(async (ctx, next) => {
    await next();
    let data = ctx.body;
    let type = ctx.type;
    if (typeof data === 'string') {
        if (type && type.indexOf('text') < 0)
            ctx.body = {data: null, result: false, message: data, code: 200};
    } else if (typeof data !== "undefined") {
        ctx.body = {data: data, result: true, message: 'ok', code: 200};
    } else ctx.status = 404;
});
//全局错误捕获
app.on('error', async (err, ctx) => {
    ctx.res.writeHead(200, {
        'content-Type': 'application/json'
    });
    ctx.res.end(JSON.stringify({result: false, code: 502, message: 'server error!'}));
});

//路由中间件
app.use(article.routes());
app.use(article.allowedMethods());

export default app;
```

##### router
路由层进行简单的模版渲染、参数校验、调用控制器等操作。  
以下是示例文件，可根据自己的实际需求添加路由文件和控制器
```javascript
//home.js
import koa_router from 'koa-router';
import controller from "../controller/homeController.js"; //控制器
import {render} from '../utils/view-engine.js'; //引擎模版

const router = koa_router();

//首页
//scope props 都是模版引擎部分的内容，后面会单独写一篇展开
router.get('/', async (ctx) => {
    let scope = ctx.scope || {}; 
    let props = {
        article: await controller.listRecent()
    };
    scope['title'] = '飞夕言';
    ctx.type = 'text/html';
    ctx.body = await render('page.home', scope, props);
});

//后台管理登陆页
router.get('/login', async (ctx) => {
    let scope = ctx.scope || {};
    let props = {};
    ctx.type = 'text/html';
    ctx.body = await render('platform.login', scope, props);
});

export default router;
```

## 写在最后 
这基本就是整个后端的整体框架了，有部分敏感内容没有展示，也有一些内容后续会写新文章来介绍。  
如果有大神路过，觉得我有哪里写的不对的可以留言给我，我会进行思考和修改的，可以一起讨论。  
希望我的文章能够对一些新手有帮助，可能文法和思路不是很清晰，有什么疑问可以联系我，后续我也会更正，
然后会继续慢慢提高自己的文风和写作水平。

