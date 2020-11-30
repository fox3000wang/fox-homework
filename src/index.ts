import page03 from './page03';

require('./css/reset.css');
require('./css/main.css');

/**
 * 整个项目的入口，这里只负责切换页面，不负责任何业务逻辑
 */
const root = document.getElementById('root');

page03(root, 3  );


let data = [
  {
    "categoryId": 1013001,
    "description": "除味除菌，如厕好心情",
    "id": 2031721,
    "itemId": 1487013,
    "joinUsers": 10196,
    "limitTime": false,
    "modeType": 1,
    "originPrice": 17.8,
    "pic": "https://yanxuan-item.nosdn.127.net/cf7915f53969301c05c13317a499291d.jpg",
    "postageFree": true,
    "price": 1,
    "recentUsers": [
      "http://yanxuan.nosdn.127.net/cca9f76f860d125a42b21d7128e3034c",
      "https://yanxuan.nosdn.127.net/c3a03895c73694d922310c76e4915cdb.png",
      "https://yanxuan.nosdn.127.net/c3a03895c73694d922310c76e4915cdb.png"
    ],
    "recommendRank": 4,
    "returnPrice": 0,
    "skuNum": 1,
    "status": 0,
    "title": "清洁除菌二合一，蓝泡泡马桶清洁剂 50g*4",
    "userNum": 3,
    "width": 300,
    "height": 230
  },
  {
    "categoryId": 1010000,
    "description": "轻盈舒适，提升家人幸福感",
    "id": 2032147,
    "itemId": 3439006,
    "joinUsers": 10964,
    "limitTime": false,
    "modeType": 1,
    "originPrice": 9.9,
    "pic": "https://yanxuan-item.nosdn.127.net/821c7f7fe6f3b4260c9de1ecbaf0b92f.png",
    "postageFree": true,
    "price": 1,
    "recentUsers": [
      "https://yanxuan.nosdn.127.net/c3a03895c73694d922310c76e4915cdb.png",
      "https://yanxuan.nosdn.127.net/c3a03895c73694d922310c76e4915cdb.png",
      "https://yanxuan.nosdn.127.net/c3a03895c73694d922310c76e4915cdb.png"
    ],
    "recommendRank": 1,
    "returnPrice": 0,
    "skuNum": 1,
    "status": 0,
    "title": "轻弹云朵居家拖鞋",
    "userNum": 3
  },
  {
    "categoryId": 1013001,
    "description": "进口原木浆 和风高颜值",
    "id": 2031712,
    "itemId": 1113001,
    "joinUsers": 12961,
    "limitTime": false,
    "modeType": 1,
    "originPrice": 16.9,
    "pic": "https://yanxuan-item.nosdn.127.net/84bf6c4e94bbfb48e456f44966932d68.jpg",
    "postageFree": true,
    "price": 9.9,
    "recentUsers": [
      "http://yanxuan.nosdn.127.net/630db92c07d579fcd37ed6d3c3419a56",
      "https://yanxuan.nosdn.127.net/c3a03895c73694d922310c76e4915cdb.png",
      "https://yanxuan.nosdn.127.net/c3a03895c73694d922310c76e4915cdb.png"
    ],
    "recommendRank": 0,
    "returnPrice": 0,
    "skuNum": 1,
    "status": 0,
    "title": "谷风一木3层软抽面巾纸 6包/提",
    "userNum": 3
  },
  {
    "categoryId": 1013001,
    "description": "小巧便携，一纸四层厚实耐用",
    "id": 2031727,
    "itemId": 1124015,
    "joinUsers": 10925,
    "limitTime": false,
    "modeType": 1,
    "originPrice": 5.9,
    "pic": "https://yanxuan-item.nosdn.127.net/bc62d699f6cfbbb7e66dbaf77bd23e53.jpg",
    "postageFree": true,
    "price": 1,
    "recentUsers": [
      "https://yanxuan.nosdn.127.net/c3a03895c73694d922310c76e4915cdb.png",
      "https://yanxuan.nosdn.127.net/c3a03895c73694d922310c76e4915cdb.png",
      "http://nos.netease.com/mail-online/84f42b50128ecc388cb54dce12efde9d/mail180x180.jpg"
    ],
    "recommendRank": 6,
    "returnPrice": 0,
    "skuNum": 1,
    "status": 0,
    "title": "谷风一木4层印花手帕纸 12包/条",
    "userNum": 3
  },
  {
    "categoryId": 1065000,
    "description": "牙齿敏感人群适用",
    "id": 2031725,
    "itemId": 1652044,
    "joinUsers": 10025,
    "limitTime": false,
    "modeType": 1,
    "originPrice": 19.9,
    "pic": "https://yanxuan-item.nosdn.127.net/c5a919a0ce30554ded3f5ae8978202d1.jpg",
    "postageFree": true,
    "price": 1,
    "recentUsers": [
      "http://yanxuan.nosdn.127.net/010662e4b05619ffd07fd700a3f6db3d",
      "https://yanxuan.nosdn.127.net/f3da04daf9fccaaa5b761b2c969d91fa.jpg",
      "http://yanxuan.nosdn.127.net/4c6889c2d9a3f845459b681e9bbe8078"
    ],
    "recommendRank": 0,
    "returnPrice": 0,
    "skuNum": 1,
    "status": 0,
    "title": "刷掉奶茶渍 俄罗斯木瓜生物牙膏",
    "userNum": 3
  },
  {
    "categoryId": 1013001,
    "description": "100%原木浆，融水即化",
    "id": 2031714,
    "itemId": 1077003,
    "joinUsers": 9497,
    "limitTime": false,
    "modeType": 1,
    "originPrice": 27.9,
    "pic": "https://yanxuan-item.nosdn.127.net/b592ccd960b27a9dac0c186f2f7d3382.jpg",
    "postageFree": true,
    "price": 18.9,
    "recentUsers": [
      "https://yanxuan.nosdn.127.net/c3a03895c73694d922310c76e4915cdb.png",
      "https://yanxuan.nosdn.127.net/c3a03895c73694d922310c76e4915cdb.png",
      "https://yanxuan.nosdn.127.net/c3a03895c73694d922310c76e4915cdb.png"
    ],
    "recommendRank": 0,
    "returnPrice": 0,
    "skuNum": 1,
    "status": 0,
    "title": "谷风一木3层180g卷纸 10卷/提",
    "userNum": 3
  },
  {
    "categoryId": 1005001,
    "description": "3卷90只，柔韧时尚",
    "id": 2031720,
    "itemId": 1548001,
    "joinUsers": 19975,
    "limitTime": false,
    "modeType": 1,
    "originPrice": 13.9,
    "pic": "https://yanxuan-item.nosdn.127.net/b9402d9bcc55047eb5d33bc9c274f06a.png",
    "postageFree": true,
    "price": 1,
    "recentUsers": [
      "https://yanxuan.nosdn.127.net/c3a03895c73694d922310c76e4915cdb.png",
      "https://yanxuan.nosdn.127.net/c3a03895c73694d922310c76e4915cdb.png",
      "https://yanxuan.nosdn.127.net/7fe1d9bbb5cc4fb3d2f7dbeab7374460.jpg"
    ],
    "recommendRank": 3,
    "returnPrice": 0,
    "skuNum": 1,
    "status": 0,
    "title": "金属色平口垃圾袋 结实到能塞下6瓶大可乐",
    "userNum": 3
  },
  {
    "categoryId": 1005001,
    "description": "优质炫瓷，不易留渍",
    "id": 2031703,
    "itemId": 1037001,
    "joinUsers": 13250,
    "limitTime": false,
    "modeType": 1,
    "originPrice": 19.9,
    "pic": "https://yanxuan-item.nosdn.127.net/50eecf6afe7e8596c7ebf2a25474bed9.jpg",
    "postageFree": true,
    "price": 3.9,
    "recentUsers": [
      "http://yanxuan.nosdn.127.net/8d904aca3c35003c76c6b1834f9d11ca",
      "https://yanxuan.nosdn.127.net/c3a03895c73694d922310c76e4915cdb.png",
      "https://yanxuan.nosdn.127.net/a467d5edcf49553e42aa1deb1c415b15.jpg"
    ],
    "recommendRank": 0,
    "returnPrice": 0,
    "skuNum": 1,
    "status": 0,
    "title": "清洗不用愁 简约陶瓷马克杯",
    "userNum": 3
  },
  {
    "categoryId": 1005001,
    "description": "吸水吸油，热销200万卷",
    "id": 2031724,
    "itemId": 1006058,
    "joinUsers": 12026,
    "limitTime": false,
    "modeType": 1,
    "originPrice": 13.9,
    "pic": "https://yanxuan-item.nosdn.127.net/afc1f0ac88dbeb5108faa7813aae3ad4.jpg",
    "postageFree": true,
    "price": 1,
    "recentUsers": [
      "https://yanxuan.nosdn.127.net/c3a03895c73694d922310c76e4915cdb.png",
      "http://yanxuan.nosdn.127.net/60fc3cf54647712b85dd219d536498bc",
      "https://yanxuan.nosdn.127.net/c3a03895c73694d922310c76e4915cdb.png"
    ],
    "recommendRank": 5,
    "returnPrice": 0,
    "skuNum": 1,
    "status": 0,
    "title": "抹布界的黑科技救星 干湿两用懒人抹布",
    "userNum": 3
  }
]


let new1 = data.map(item => {
  item.height = 100 + Math.random() * 300;
  console.log(item.height)
  return item;
});

console.log(JSON.stringify(new1));