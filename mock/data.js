 const Qs = require('qs');
 const Mock = require('mockjs');
 // 数据持久

 var movie = {
 'id|+1': 1,
 'name': '@Name',
 };

 var name = {
 'id|+1': 1,
 'first': '@FIRST',
 'last': '@LAST',
 };

 module.exports = {
 // Forward 到另一个服务器
 'GET https://assets.daily/!*': 'https://assets.online/',

 // Forward 到另一个服务器，并指定路径
 'GET https://assets.daily/!*': 'https://assets.online/v2/',

 // Forward 到另一个服务器，不指定来源服务器
 'GET /assets/!*': 'https://assets.online/',

 // Forward 到另一个服务器，并指定子路径
 // 请求 /someDir/0.0.50/index.css 会被代理到 https://g.alicdn.com/tb-page/taobao-home, 实际返回 https://g.alicdn.com/tb-page/taobao-home/0.0.50/index.css
 'GET /someDir/(.*)': 'https://g.alicdn.com/tb-page/taobao-home',

 // 本地文件替换
 'GET /local': './local.js',

 // Mock 数据返回
 'GET /users': [{ name: 'sorrycc' }, { name: 'pigcan' }],
 'GET /users/1': { name: 'jaredleechn' },

 // Mock 数据，基于 mockjs
 'POST /tag/user/SearchEmployeeInfo.do': Mock.mock({
 status: 'S',
 success: true,
 'data|40': [{ 'id|+1': 1, siteName: '@url', domain: '@url', description: '@sentence', interfacePersonList: '@cname' }],
 }),

 'GET /y.do'(req, res) {
 res.status(200);
 res.jsonp(Mock.mock({ data: movie, success: true, status:'S',}), 'cb');
 },

 'POST /z.do'(req, res) {
 var postData = Qs.parse(req.body);
 var pageSize = postData.pageSize;
 var currentPage = postData.currentPage;
 name['id|+1'] = pageSize * (currentPage - 1);
 var tmpl = {};
 tmpl['dataList|'+pageSize] = [name];
 tmpl['success'] = true;
 tmpl['pageSize'] = pageSize;
 tmpl['currentPage'] = currentPage;
 res.json(Mock.mock(tmpl));
 },

 'GET /x.do': Mock.mock({ name: '@Name',status: 'S',success: true }),
 // Mock 数据，基于 mockjs
 'POST /tag/site/findSite.do'(req, res) {
 var postData = Qs.parse(req.body);
 var current = postData.current;
 var retrunData = {
 status: 'S',
 success: true,
 page:{
 defaultCurrent:1,
 current:current,
 total:50
 },
 'data|40': [{ 'id|+1': 1, siteName: '@url', domain: '@url', description: '@sentence', 'interfacePersonList|5': [{ 'empId|1-100': 100, lastName: '@cname' }] }]
 };
 res.json(Mock.mock(retrunData));
 },
 /*
 // 通过自定义函数替换请求
 '/custom-func/:action': function(req, res) {
 // req 和 res 的设计类 express，http://expressjs.com/en/api.html
 //
 // req 能取到：
 //   1. params
 //   2. query
 //   3. body
 //
 // res 有以下方法：
 //   1. set(object|key, value)
 //   2. type(json|html|text|png|...)
 //   3. status(200|404|304)
 //   4. json(jsonData)
 //   5. jsonp(jsonData[, callbackQueryName])
 //   6. end(string|object)
 //
 // 举例：
 res.json({
    action: req.params.action,
    query: req.query,
  });
 },
 */
 };

