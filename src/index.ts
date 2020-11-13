require('./css/reset.css');
require('./css/main.css');

import LazyImage from './LazyImage';
import Waterfall from './Waterfall';

const container = document.querySelector('.container');
const columns = container.querySelectorAll('.column');
const loadMore = document.querySelector('.loadMore');

new Waterfall({columns,loadMore}).init();
