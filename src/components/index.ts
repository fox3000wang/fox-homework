// 模块转移导出统一放在这里, 一个class只导出一个组件
// 只是试验模块的【模块转移导出】并非最佳实践
// 因为在每次增加一个组件的时候,都要修改这个文件,加一个功能要改两个文件
// 参考过loadsh的源码, 人家也没这么玩, 一个功能两个入口...
// 在实际开发导入阶段, 都要在两个两个里面选一个, 有点麻烦。
export { LazyImageLoader } from './LazyImageLoader';
export { Magnifier } from './Magnifier';
export { Waterfall } from './Waterfall';
