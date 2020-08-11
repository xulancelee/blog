# 联系方式

- 手机：15622330325
- 邮箱：cz.zhanxw@gmail.com
- 微信号：15622330325

---

# 个人信息

- 詹旭文 / 男 / 1995
- 本科 / 广州大学 / 软件工程专业
- 工作年限：3年
- Github：http://github.com/czAlexzhan
- 期望职位：前端开发工程师，react工程师
- 期望薪资：15k ~ 20k
- 期望城市：深圳

---

# 项目经历

### XX网项目 
- 项目概述：公安区域声纹库管理系统
- 负责内容：
  - 负责一个主网登录和5个子系统的前端开发
  - 开发快速、易扩展、可复用的通用框架
  - 技术选型，最终选定`react` / `antd` / `mobx` / `typescript`
  - 接口文档管理，使用 `yapi`管理接口
- 技术难点/亮点
  - 权限控制：包括菜单的权限控制、数据的权限控制、按钮的权限控制
    - 菜单权限控制： 登录后由服务返回已配置的菜单，再和本地路由配置做对比，区分哪个该显示；鉴权高阶组件，目的是为了不让用户通过url去访问本不属于用户       的菜单
    - 数据的权限控制：此部分由后台控制
    - 按钮的权限控制：使用高阶组件，对用户的角色进行判断，做相应的处理
  - 前端组件管理：组件各个系统复用程度高，改个组件复制粘贴麻烦，创建一个公共组件管理库，统一管理自用组件
  - 大文件多文件上传：有部分业务可能涉及上千个文件，文件中可能有超过500MB的大文件上传需求，此过程使用antd的upload组件，会导致页面卡死（回调太多）,     只能自己造轮子。服务优化方面，使用Nodejs造了个文件服务器，支持小文件直接上传，大文件分块上传的功能，多开实例，用nginx负载均衡,文件上传走文件服     务器
  - 打包优化/编译提速：项目庞大，需要对打包进行优化，给自己和用户好的使用体验
  - 自动登录判断: 子网的自动登录是从主网跳转，为了防止复制链接达到自动登录的效果，增加了对页面referrer的判断
  - pki登录: 使用了u盾进行安全登录
- 项目成果
  - 对于多文件上传，目前已经支持1k+的文件上传
  - 优化编译打包后，速度至少提升30%-40%
  - 目前该系统已经在两个省的各级地级市部署，为公司带来收益在2000千万以上
### 展厅项目
- 项目概述: 该项目是公司产品场景落地的体验中心，是公司接待贵宾，展示公司实力的窗口
- 负责内容:
  - 架构的设计: 指定方案以及技术选型，整体模块的设计，组件的设计
  - 监控模块的开发: 对声纹实施监控这一场景的页面进行开发
  - 优化: 负责后续的优化
- 技术难点/亮点
  - 整个项目只使用语音进行交互，使用唤醒命令控制流程，需要对各种状态进行有效地控制
  - 项目稳定性要求高，过程不能出现卡顿，报错，更不能出现白屏
  - 监控模块的优化: 此页面几乎都是实时渲染，子模块众多，如果不针对单独优化，会造成cpu和内存占用过高，cpu发热量变大，进而导致cpu降频，页面卡顿
- 项目成果
  - 针对监控页面单独优化后，内存占用显著降低，cpu占用率从35% - 40% 降低至 5% - 8%
  - 上线至今，为多家投资公司进行过稳定的演示
### 体验中心小程序
- 项目简介: 对公司产品适用的各个场景进行演示的一个小程序
- 技术难点/亮点
  - mobx: 使用了mobx进行全局状态管理
  - 国际化: 小程序支持国际化
  - 使用dataview进行数据交互和加密
  - 动画要求高
  - 云开发
- 项目成果
  - 目前有5000+使用这个小程序，为公司声纹技术的推广有着不可磨灭的贡献
### 其他项目
- 公司官网
  - 使用了 `ssr`对seo优化
- 微信公众号页面
- 等等
---
# 工作经历

### 深圳市声扬科技有限公司     （2019年3月 - 至今）
- 前端工程师

### 深圳市驱动人生科技有限公司   （2018年6月 - 2019年3月）
- 前端工程师

### 广东省海格怡创有限公司    （2017年5月 - 2018年6月）
- java工程师



---



# 技能清单

### 以下是我会使用的技能

- Web开发：`nodeJs`  / `java`
- Web框架：`egg` / `nestJs` / `springBoot` / `nginx` / `docker`
- 前端框架：`Bootstrap` / `Vue` / `React` / `umi`
- 前端工具：`webpack` / `less` /  `antd` / `echart`  / `mobx` / `typescript`
- 版本管理、文档和自动化部署工具：`Git` / `gitLab ci` / `yapi`
- 其他：微信小程序 / 微信公众号页面

---

# 自我评价

- 具备良好的沟通能力，能快速理解需求并开发
- 对工作尽职尽责，乐于从事有挑战性的工作
- 关注前端前沿技术、喜欢分享
- 平时喜欢逛掘金、v2ex、刷leecode

---

# 致谢

感谢您花时间阅读我的简历，期待能有机会和您共事。

