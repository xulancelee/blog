
##一面  
>一面，以考察基础为主，同时也会有笔试题的考察。面试官，一般都比较好沟通，对于基础问题都会有所探讨。
>因为这一面的面试官，大概率是自己以后的师兄/师姐。主要会从以下几个维度考察：  
>JS基础  
>CSS基础  
>网络层  
>常用技术栈

###JS基础  
1.for循环和forEach循环，哪种性能会好一些  
    
     for循环适合用在已知长度的的Array的循环中，速度比forEach快
     for in适合用在对象key的遍历
     for of是ES6对Map Set Array等拥有enumerable属性的对象的遍历枚举
     速度 for < for of < forEach < for in
        
2.let，const和var的区别【给一道题，分析报出什么错误】  

    从 变量提升 暂时性死区 重复声明 初始值 作用域 来回答
    
3.JS的基础数据类型有哪些  

    undefined string number function object(null,Array,Date,Regex) boolean symbol

4.什么是Symbol，它的使用场景是什么  

    Symbol就如它的名字一样，就是一种符号，是一种唯一的标识符
    一般用在需要使用唯一标识符的地方，可以用于消除魔术字符串，对程序进行解耦等

5.数组原型上面的方法有哪些，哪些是可以改变数组的，哪些是不可以的  

    可:push pop shift unshift reverse splice sort
    否:forEach fill every indexOf filter concat join slice toString
    
6.如何转换一个类数组对象，大致原理是怎么样的  

    [].slice.call(ArrayLike);
    Array.form(ArrayLike);
    [...ArrayLike]
    兼容方法 手动push

7.Map 和 WeakMap的区别  

    Map的Key可以是任意值，WeakMap的键只能是对象
    WeakMap是Map的弱引用版本，如果键被回收处理了，WeakMap也会删除对应的键值对
    WeakMap不可枚举，无法获取大小

8.了解JS的作用域么，函数作用域是在什么时候形成的  

    作用域是在变量声明阶段就已经形成，函数内(块内)可以访问函数外的变量，然后根据执行环境不同会有不一样的全局作用域
    浏览器的是window，nodejs有globel

9.什么是闭包，它有什么作用，它的原理  

    闭包是在执行阶段产生的类似作用域的具象化，可以保存作用域下的变量内容，直到被垃圾回收机制回收

10.通过例子的形式，说一下JS的原型链  

    

11.如何实现一个new  

    function MyNew(Fn, ...args) {
        let obj = {};
        Fn.apply(obj, args);
        obj.__proto__ = Fn.prototype;
    }

12.说一下JS的继承方式  

    可以通过原型链继承

13.什么是箭头函数，它和普通函数的区别  

    箭头函数是ES6的新内容，箭头函数不会创建this指向，会捕获上下文的this；
    箭头函数不能用作构造函数

14.this的指向【通过题目考察，表述结果，解释理由】  

    一般直接调用的函数this的指向是全局变量
    通过引用调用(a.b)的函数，this指向调用的对象

15.如何迭代一个对象，for..in这种方式，如何取出对象自己的属性  

    es6可以通过for...of的方式迭代一个enumerable对象Array，Map，Set等都是可迭代对象
    也可以用for...in来迭代一个对象，可以通过hasOwnProperty来提取自己的属性

16.Object.assign它是一个浅拷贝还是深拷贝  

    浅拷贝

17.如何实现一个深拷贝  

    通过浅拷贝 + 递归的方式实现

18.什么是Promise，如何实现它，Promise.then，Promise.race如何实现  

    

19.什么是防抖，什么是节流，如何实现防抖  

    防抖就是一个操作要在异步一定的时间内才返回执行结果，而在返回结果之前又触发了操作。
    节流就是某些操作会在一段时间内多次触发，限制这些操作规定在一段时间内只执行一次。
    防抖和节流都可以通过标志变量来实现控制。

20.描述一下Event Loop，这个循环会一直下去么，宏任务和微任务的区别【通过笔试题的方式，表述结果，解释理由】  

    JavaScript的运行是单线程的，所以有一些耗时的任务可以通过异步执行来保证主线程不被阻塞，
    异步任务执行完成会在任务队列里插入回调任务，在JS的执行机制中，任务是存放在调用栈里的，
    在执行完同步任务之后，就会去查看调用栈的内容，如果调用栈的内容为空，就会去查看微任务队列，
    如果微任务队列不为空，就会一次性执行所有微任务，然后再去查看宏任务队列。

30.如果在Event Loop中，不断push微任务是否一直会执行  

    会一直执行下去，如果递归调用了创建微任务的函数，会导致程序进入死循环无法执行宏任务。

31.浏览器的事件机制有哪几个阶段？addEventListener的第三个参数起到什么作用  

    捕获阶段 > 执行阶段 > 冒泡阶段，第三个参数是指事件在冒泡阶段执行还是在捕获阶段执行，默认为false，在冒泡阶段执行。

32.如何实现一个请求超时

    通过setTimeout来控制请求超时，超过时间调用abort中断请求并返回错误结果执行error或reject.


###CSS基础
1.什么是盒模型，如何进行不同盒模型的切换  

    盒模型就是一个HTML内容所展示的内容，包括margin padding border content.
    在css里可以通过box-sizing属性去做控制，有border-box和content-box两种

2.样式的优先级排序，如何去获取一个样式的相邻元素  

    内联样式 > ID > 类 > 标签
    可以通过 + 来获取相邻元素

3.position的属性值有哪些，它们的区别是什么  

    static fixed relative absolute sticky

4.列举一下移动端适配方案  

    

5.flex的布局了解么，什么是主轴，如何控制主轴和副轴  
6.Flex的优点和缺点，如何用flex布局两边固定，中间自适应；同时其他方式能实现么  
7.如何实现水平垂直居中  
8.如何清除浮动，清除浮动的原理  
9.什么是BFC，它的作用是什么，什么行为会产生BFC  
10.父元素浮动了，子元素形成BFC能清除浮动么  
11.css的动画如何实现  
12.为什么使用transform写动画，不用left写动画  
13.回流和重绘的区别，什么行为会导致回流，什么行为会导致重绘  
14.了解CSS3么，CSS3里面新增了哪些属性  
15.1px的问题可以如何去解决【尽可能地多说】  
16.less和css的区别，less的函数有了解过么  


###网络层  
1.在浏览器输入一个URL的整体过程是怎么样的  

    dns查找
    tcp链接
    HTTP 请求及响应
    服务器响应
    客户端渲染
    输入URL，回车，浏览器会去查找电脑的dns找到指向域名的IP地址，如果电脑dns没有查到就会去向dns服务器查找...
    通过ip地址找到域名的服务器，向服务器发出http请求，请求报文包括请求头和请求主体。
    服务器在接收到请求后验证请求头内容和请求报名内容，通过验证后返回响应的内容给浏览器，
    返回的报文也包含响应头和响应主体内容，浏览器在接收到返回的内容后，根据响应头来检查
    返回内容的类型，如果是html类型，就会展示加载html内容，在加载过程中如果碰到一些样式、图片、脚本等
    外部资源链接，会继续去向服务器请求资源文件，在样式文件返回时会触发回流，脚本文件返回后会执行脚本。

2.描述一下浏览器页面渲染的过程  

    解析HTML
    构建DOM
    构建CSSOM
    构建渲染树
    布局和绘制

3.浏览器白屏是什么导致的  
    
    白屏是浏览器在加载资源时，出现未加载完全部资源时，
    选择等待全部资源加载完成之后再进行计算和渲染的等待加载过程。
    
4.浏览器存储Cookie、localstorage、sessionStorage的区别  

    

5.cookie如何进行设置的，JS能改变哪些值  

    后端可以通过Set-Cookie头进行设置
    前端可以通过document = 'key=value' 进行设置
    如果后端设置的cookie没有设置为http only的，js都能获取修改

6.描述一下浏览器缓存  

    在浏览器获取返回的资源时，会根据响应头来决定是否对资源进行缓存
    Expires 和 Cache-Control 
    协商缓存会先向服务器发送Last modified

7.HTTP的状态码有哪些  

    2xx 成功
    3xx 重定向
    4xx 客户端错误
    5xx 服务器错误

8.HTTP的请求头包含什么  

    UserAgent Cache-Control Connection Transfor-Encoding 
    Date Accept Authorization Host From Expect Age Expires Status

9.解决跨域的方法有哪几种  

    JSONP CORS postMessage websocket Nginx反向代理 node中间件

10.描述一下JSONP的原理  

    页面可以通过src请求跨域脚本，利用这一点，我们可以在全局注册一个函数，然后通过传递这个函数名请求后端数据，
    然后后端封装一个调用该函数的脚本内容，函数参数为返回的数据，来实现跨域请求

11.描述一下CORS的过程  

    Access-Control-Allow-Origin


###常用技术栈  
1.vue 和 react的一些区别  
2.vue的生命周期有哪些  
3.vue的异步组件了解过么  
4.vue的双向数据绑定如何实现的，数组的响应式如何做到的，proxy的好处  
5.vue的指令有哪些，v-if和v-show的区别是什么  
6.计算属性和侦听属性的区别  
7.vue的虚拟DOM和react的有什么不一样  
8.描述一下vue的diff算法  
9.v-for之后的key的作用是什么  
10.Vue的组件通信有哪些  
11.keep-alive如何实现  
12.如何实现一个hash路由  
13.vueRouter的方式有哪两种，区别是什么  
14.vueRouter的路由守卫了解么  
15.vue3.0的新特性了解么  
16.React的setState的机制是什么  
17.描述一下React生命周期  
18.描述一下redux的中间件原理  
19.redux如何进行异步处理  
20.redux和dva的区别  
21.webpack的loader和Plugins有什么区别，webpack是如何去使用Plugins的  
22.描述一下小程序的同层渲染原理  
23.小程序的bindtap和catchtap的区别  
24.小程序的通信是怎么样的  
25.小程序的setData的数据如果很大，如何解决  
26.如何实现数据打点和用户行为监控  


###编程题  
1.实现一个sum方法【sum(1, 2, 3)(4)，sum(1, 2)(3, 4)类似的调用】，同时console.log(sum(1, 2, 3)(4) => //输出10  
```js
    function sum(...args) {
        let temp = 0;
        args.forEach((value => {temp += value}));
        function result(...args) {
            args.forEach((value => {temp += value}));
            return result;
        }
        result.toString = () => temp;
        return result;
    }
```
2.给定一个先增后降的数组，找出其中的最大值
```js
    function foundMax(array) {
        for (let i = 0; i < array.length - 1; i ++) {
            if(array[i] > array[i+1]) return array[i];
        }
        return array[array.length - 1];
    }

    function foundMaxBinary(array) {
        let mid = Math.floor(array.length / 2);
        let midVal = array[mid];
        let left = array[mid - 1] || -Infinity;
        let right = array[mid + 1] || -Infinity;
        if(midVal > left && midVal > right) return midVal;
        else if (left > midVal) return foundMaxBinary(array.slice(0, mid));
        else return foundMaxBinary(array.slice(mid));
    }
```
3.实现数组去重的方法【尽量多写】

4.实现一个正则表达式（匹配url链接）
```js
const re = /(((http|ftp|https):\/\/)?)([a-zA-Z0-9.-])(:[0-9]{1,4})\/[a-zA-Z0-9&%./-~-]*/;
```
5.如何通过CSS实现一个梯形，然后实现一个可以点击的圆形
```css
.trapezoid{
    border-bottom: 100px solid red;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    width: 100px;
}
.route{
    width: 100px;
    height: 100px;
    border-radius: 100px;
}
```

6.一个人总共吹了253根蜡烛，它几岁了【一岁吹一根，两岁吹两根，依次类推】
```js
function countAge(candel) {
    let i = 0;
    while (candel >= i) {
        i++;
        candel -= i;    
    }
    return i;
}
```
7.如何实现两个有序数组的合并，要求时间复杂度是O(n)
```js
function concat(array1, array2) {
    let index1 = 0;
    let index2 = 0;
    let len1 = array1.length;
    let len2 = array2.length;
    let result = [];
    while (index1 < len1 || index2 < len2) {
        if(array1[index1] < array2[index2]) {
            result.push(array1[index1]);
            index1++;
        } else {
            result.push(array2[index2]);
            index2++;
        }
    }
    return result;
}
```

##二面  
>二面，一般都会考察一些项目问题，性能优化，也会对基础的原理部分进行综合考察。
>二面面试官，往往是以后自己的leader，或者其他部门更加资深的技术。
>考察的维度比较多变，需要多对项目这个部分进行准备。

###基础部分  
1.Http状态码有哪些  
2.HTTP1.1/HTTP2.0的区别  
3.描述一下浏览器缓存  
4.cookie和Session的区别  
5.描述一下xss和csrf，如何防范  
6.请求超时timeout的原理  
7.描述一下进程和线程  
8.node内存泄漏的原因  
9.了解过vue迁移到小程序的原理  
10.虚拟列表的实现原理  
11.骨架图的实现方案  
12.React hooks的优点  
13.Dva的同步状态管理，异步状态管理，是如何实现的  
14.描述一下vue的nextTick的原理  
15.webpack常用插件，以及dev和product有啥差别  
16.webpack打包原理  
17.小程序页面之间的通信怎么处理  
18.webview组件和原生组件的区别  

###性能优化  
1.移动端的性能优化【从自己做过的角度出发】  
2.webpack的性能优化如何做  
3.如何进行首屏加载优化  
4.平时如何做小程序部分的性能优化的  

###编程题
1.写出3种水平垂直居中方案  
2.手写实现bind方法  
3.手写promise的sleep函数实现  
4.手写Promise.all的实现  
5.算法题 - 寻找最长不重复子串  
6.算法题 - 计算年龄 【输入一个字符串：yyyy-mm-dd，根据当前时间计算它的年龄】  

>二面面试过程中，会涉及到项目的问题，我这里不进行列举。
>因为每个人的项目不太一样，参考意义不大。可以多对项目中的难点和亮点进行展开叙述

##三面
>三面，一般会考察项目，个人规划，提供技术方案的能力。
>三面的考察，开放程度更大，每个人根据自己的情况，酌情回答。
>同时，也会有笔试题的考察

1.聊项目，项目中遇到的问题，如何解决的  
2.回头看，项目中还有什么需要改进的地方  
3.平时如何去做性能优化的  
4.在公司有啥技术贡献  
5.在原公司，自己最大的成长是什么  
6.自己觉得在原公司的开发流程上，还有哪些可以改进的  
7.代码的注释，数组的解构，整体的思路，如何进行函数的封装，如何使用设计模式，如何你进行代码调试  
8.希望公司能够提供你什么  
9.自己未来的职业规划是怎样的  
10.平时如何进行学习的  
11.目前在学习什么【慎重回答，这是面试的扩展点】  
12.离职的原因是什么  

###编程题
1.算法题 - 实现一个二分查找  
2.实现一个异步缓存请求【考察并发】  
3.算法题 - {} [] ()三个判断是否闭合  

##hr面
>hr面，一般比较轻松。主要围绕着你的基本信息、薪资情况、个人发展、性格、和他人相处、团队协作等方面展开。
>题目本身开放性程度比较大，每个人的答案也不相同。按照个人情况作答即可。

1.你为什么离职，对上一家公司的印象如何  
2.你的优点是什么，缺点是什么【一般会让你通过具体案例去说明】  
3.你在别人眼里是怎么样的一个人  
4.你对未来的规划是怎样子的  
5.你的期望薪资是多少  