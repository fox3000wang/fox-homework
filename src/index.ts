import page03 from './page03';

require('./css/reset.css');
require('./css/main.css');

/**
 * 整个项目的入口，这里只负责切换页面，不负责任何业务逻辑
 */
const root = document.getElementById('root');

page03(root, 3  );

