# Vue3-ts-saas

基于 Vue3 脚手架与 typescript 实现 saas 中型中后台管理系统

- [x] 支持设置渲染页面模式【vue-router, component, iframe】
- [x] 支持 saas 系统，注入模块
- [x] 支持按需配置 vite
  - [x] less 开发
  - [x] vite-bundle-analyzer(打包分析工具)
- [x] 支持不同环境运行与构建打包
- [x] 支持手动命令生成模版文件
- [x] 支持 mock 模拟
- [x] 支持 配置转发
- [x] 支持 git 提交代码规范化

## TODO

- [ ] 抽离部分逻辑为可配置项到 ./src/app.config.js 下
- [ ] 集成 jest 单元测试

## 技术选型

- [Vue@3](https://cn.vuejs.org/)
- [vuex](https://pinia.web3doc.top/)
- [vue-router@3](https://router.vuejs.org/zh/guide/)
- [axios](http://www.axios-js.com/)
- [ElementPlus](https://element-plus.gitee.io/zh-CN/)
- [lodash](https://www.lodashjs.com/)
- [pinia-plugin-persist](https://seb-l.github.io/pinia-plugin-persist/)

参考文档

- [hygen](http://www.hygen.io/docs/express/)
- [Husky+Commitlint+Lint-staged+Prettier](https://www.jianshu.com/p/0e51c0c39280)
- [husky+commitizen](https://www.pudn.com/news/6228dbac9ddf223e1ad27a43.html)
- [eslint](https://eslint.bootcss.com/)
- [stylelint](https://stylelint.io/)

## 项目结构

```bash
|-- .husky               // husky git hook
|   |-- commit-msg       // git commit 提交钩子
|   |-- pre-commit
|
|-- .vscode              // vscode ide 编辑器配置文件（用于团队内部统一规则）
|   |-- settings.json    // 配置环境（vscode）
|   |
|-- .public              // 前端静态资源
|   |
|   |
|-- src
|   |-- api              // api 接口
|   |-- api.config       // api 域名以及环境配置
|   |
|   |-- assets           // 公共资源目录
|   |   |-- icon         // icon资源
|   |
|   |-- components        // 全局公共组件目录
|   |
|   |-- directives        // 自定义vue指令库
|   |
|   |-- element-ui        // element-plus UI组件库引用
|   |  |- index.js        // 按需全局注册 UI组件
|   |  |- theme           // 存放 element 主题
|   |
|   |-- mock              // mock模拟本地数据(内部可根据模块划分文件，并自己按需注册接口地址)
|   |
|   |-- store             // vuex数据管理中心
|   |   |- index.ts       // 初始化，并自动根据 modules 下的文件夹进行模块注册
|   |   |- mutation-types // mutation 公共变量
|   |   |- modules        // state，getters，actions，mutations集合
|   |
|   |-- router            // 路由目录
|   |   |-- modules               // 静态路由模块文件
|   |   |-- utils.ts              // 辅助工具函数
|   |   |-- system-static.ts      //支持静态配置路由
|   |
|   |-- util  // 工具目录
|   |
|   |-- layout        // 页面通用布局组件 (如404,500,登录,注册等)
|   |
|   |-- views  // 页面组件目录
|   |   |
|   |   |-- Main.tsx      // 路由入口
|   |   |
|   |-- saas-modules      // saas 模块，可以按需注册静态路由
|   |   |-- Home          // 模块
|   |   |   |
|   |   |   |-- router    // 模块路由
|   |   |   |
|   |   |   |-- store    // 模块vuex
|   |   |   |
|   |   |   |-- views    // 页面模块文件
|   |   |   |
|   |   |   |-- components    // 模块通用组建
|   |
|   |-- events            // 挂砸系统事件中心
|   |
|   |
|   |-- system-entry      // 系统框架入口文件
|   |
|   |-- types             // typescript 全局定义声明文件
|
|
|-- .cz-config.js         // 自定义 commitizen 特性配置
|-- .czrc                 // commitizen 路径配置
|-- .editorconfig         // 自定义编辑器设置文件
|-- .env.build-dev        // 开发环境构建配置文件
|-- .env.build-prod       // 正式环境构建配置文件
|-- .env.build-release    // 测试环境构建配置文件
|-- .env.serve-dev        // 本地开发环境配置文件
|-- .env.serve-prod       // 本地正式环境配置文件
|-- .env.serve-release    // 本地测试环境配置文件
|-- .eslintcache          // eslint 缓存配置（可删除）
|-- .eslintignore         // eslint 可忽略校验配置（可删除）
|-- .eslintrc.js          // eslint规则配置文件
|-- .gitignore            // git忽略配置文件
|-- .prettierignore       // prettier 忽略格式化配置文件
|-- .prettierrc.js        // prettier 格式化配置文件
|-- .stylelintcache       // stylelint 缓存配置（可删除）
|-- .stylelintignore      // stylelint 忽略格式化配置文件
|-- babel.config.js       // babel 配置文件（方便按需配置）
|-- commitlint.config.js  // git commit 提交配置文件
|-- husky.config.js       // git commit 提交钩子 husky
|-- lint-staged.config.js // 提交前检查类型配置
|-- mock.config.js        // mock 配置，内置实现mock模块注册钩子
|-- postcss.config.js     // postcss 预处理
|-- proxy.config.js       // 本地转发代理配置
|-- versionrc.js          // git commit 特性配置文件
|-- tsconfig.json         // TypeScript 编译器的配置文件
|-- package.json          // 项目配置依赖包文件
|-- README.md             // 项目说明文件
|-- yarn.lock             // yarn安装依赖包的版本信息锁定文件
```

## 本地开发

### `npm run serve`

在本机运行开发环境（运行 npm run serve:dev）

### `npm run serve:dev`

执行功能同上（npm run serve）

### `npm run serve:mock`

在本机运行开发模拟环境

### `npm run serve:release`

在本机运行测试环境

### `npm run serve:prod`

在本机运行正式环境

## 构建命令

### `npm run build`

执行构建，打包开发环境代码（同等于运行 npm run build:dev）
前端资源文件构建后默认会生成于 `/dist/dev` 目录下

### `npm run build:dev`

执行功能同上（npm run build）

### `npm run build:release`

执行构建，打包测试环境代码
前端资源文件构建后默认会生成于 `/dist/release` 目录下

### `npm run build:prod`

执行构建，打包正式环境代码
前端资源文件构建后默认会生成于 `/dist/prod` 目录下

### `npm run build:analyzer`

执行构建，打包开发环境代码并执行了打包分析工具

## 代码格式化命令

### `npm run lint`

执行 npm run lint:all 命令

### `npm run lint:all`

执行代码格式化，对项目中的 vue，css，less，js，ts，tsx 等文件进行代码格式化检测

### `npm run lint:prettier`

对项目中的 js 文件进行代码格式化检测

### `npm run lint:stylelint`

对项目中的 css，less 等文件进行代码格式化检测

## git commit 提交代码命令

### `npm run commit`

执行代码 git commit 提交，仅支持 versionrc.js，.cz-config.js 中配置的特性提交，从而实现团队在提交上的规范操作，在提交过程中还会执行 eslint，prettier，stylelint 等代码检测以及格式化
