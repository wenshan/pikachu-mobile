import 'antd-mobile/dist/antd-mobile.less';
import ReactDOM from 'react-dom';
import React from 'react';
import Utils from '../utils/index';
import { Button } from 'antd-mobile';

const ajax = Utils.ajax,
  login = Utils.common.login;

// modules
import Cookies from 'js-cookie';

window.Domain = '.test.goago.cn';
window.API = {
  init: `http://data${window.Domain}:8080` + '/init.json',
};

window.COOKIES_INFO = {};
COOKIES_INFO.token = Cookies.get('com.gooagoo.passpart.sso.token.name') || 'undefined';
COOKIES_INFO.user_data = {};

/* (function(){
    ajax({
        url: API.DATAURL,
        data:{
            sso_token:COOKIES_INFO.token
        },
        method: 'get'
    }).then(resp => {
        if(resp.status === 'S'){
            let data = resp.data;
            Cookies.set('now_username', data.userName, { path: '/' });
            Cookies.set('now_shopid', data.shopId, { path: '/' });
            Cookies.set('user_data', JSON.stringify(data), { path: '/' });
            COOKIES_INFO['user_data'] = data;
        }else{
            login();
        }
    }).catch(err => {
        login();
    });
})();*/

const props = {
  domain: window.Domain,
  suffix: '.html',
  mode: 'horizontal',
  indexComponent: Home,
  user: {
    name: COOKIES_INFO.user_data.userName,
  },
  name: 'GOOAGOO.COM',
  footer: '@2016 GOOAGOO.COM',
};

//ReactDOM.render(<Index {...props} />, document.getElementById('react-content'));


const ButtonExample = React.createClass({
  render() {
    return (
      <div style={{ margin: '0 8px' }}>

        <div style={{ margin: '32px 0' }}>
          <Button data-seed="logId">default 按钮</Button>
          <div style={{ height: 8 }} />
          <Button disabled>default disabled 按钮</Button>
        </div>

        <div style={{ margin: '32px 0' }}>
          <Button type="primary" onClick={e => console.log(e)}>primary 按钮</Button>
          <div style={{ height: 8 }} />
          <Button type="primary" disabled>primary disabled 按钮</Button>
        </div>

        <div style={{ margin: '32px 0' }}>
          <Button type="ghost" onClick={e => console.log(e)}>ghost 按钮</Button>
          <div style={{ height: 8 }} />
          <Button type="ghost" disabled>ghost disabled 按钮</Button>
        </div>

        <div style={{ margin: '32px 0' }}>
          <Button type="warning">warning 按钮</Button>
        </div>

        <div style={{ margin: '32px 0' }}>
          <Button loading>loading 按钮</Button>
        </div>

        <div style={{ margin: '32px 0' }}>
          <Button activeStyle={false}>无点击反馈</Button>
          <div style={{ height: 8 }} />
          <Button activeStyle={{ backgroundColor: 'red' }}>自定义点击反馈 style</Button>
        </div>

        <div style={{ margin: '32px 0' }}>
          <p className="demo-p">inline / small</p>
          <div style={{ height: 8 }} />
          <Button inline>default inline</Button>&nbsp;
          <Button inline size="small">default inline small</Button>
          <div style={{ height: 8 }} />
          <Button type="primary" inline>primary inline</Button>&nbsp;
          <Button type="primary" inline size="small">primary inline small</Button>
        </div>
      </div>
    );
  },
});

ReactDOM.render(<ButtonExample />, document.getElementById('react-content'));
