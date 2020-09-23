# kk馆 Git 使用指导

## 主要分支

- `master` 主分支 测试环境
- `pre-release` 预览分支 预发布环境
- `released` 发布分支 生产环境
- `<dev>` 开发分支 开发环境

## 协作流程

1. 从 `released` 分支新建开发者分支 `<dev>` 自定义分支名称
```shell script
git checkout released && git checkout -b <dev>
```

2. 在开发者分支 `<dev>` 分支进行功能需求开发
```shell script
git checkout <dev>
```

3. 功能需求开发完毕，合并至 `mater` 分支 进行编译、提交远程、转测试
```shell script
# 切换分支
git checkout master

# 拉一下其他协作开发者的代码
git pull

# 合并开发分支
git merge <dev>

# 编译前tasks/start.js中改一下版本号
# 打包时config/config.js 中网关对应切换
npm run build

git add . && git commit -m "fix ..." && git push
```

4. 测试环境测试完毕，合并至 `pre-release` 分支 进行编译、提交远程、转测试
```shell script
# 切换分支
git checkout pre-release

# 拉一下其他协作开发者的代码
git pull 

# 合并开发分支
git merge <dev>

# 编译前tasks/start.js中改一下版本号
# 打包时config/config.js 中网关对应切换
npm run build

git add . && git commit -m "fix ..." && git push
```

5. 预发布环境测试完毕，合并至 `released` 分支 进行编译 提交远程
