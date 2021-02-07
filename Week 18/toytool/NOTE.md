学习笔记
#### 工具链
在项目创建，开发，部署，发布，维护过程中所使用到的一系列工具的总和
https://juejin.cn/post/6844904086874095623

#### 实现一个脚手架工具的思路:
- 接收用户输入，形成package.json文件
- 安装依赖
- 复制文件

#### webpack config
- 使用npx webpack安装webpack
- webpack loader: 作用是将webpack不认识的文件翻译成为可以识别的文件。配置形式是一个数组，数组的项用来描述如何处理这部分的文件。配置一项rules大概通过以下方式实现。
    - 1.条件匹配：通过test，include，exclude三个配置项来命中
    - 2.应用规则：对选中的文件通过use配置项来应用loader, 可以只应用一个loader或者按照从后往前的顺序应用一组loader,可以分别为loader传入参数。
    - 3.重置顺序：一组loader执行顺序默认从右往左，可以使用enforce 选项改变执行顺序。
- webpack plugin: 作用是一个生命周期钩子函数，在webpack打包过程的特定时期执行对应的操作
- babel: 把高版本的Ecmascript编译为低版本的