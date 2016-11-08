import 'antd-mobile/dist/antd-mobile.less';
import ReactDOM from 'react-dom';
import React from 'react';
import Utils from '../utils/index';
import { NavBar, Icon, } from 'antd-mobile';
import Home from '../modules/home/index';
const ajax = Utils.ajax, login = Utils.common.login;

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
      <div>
        <div style={{ height: 8 }} />
        <NavBar leftContent="返回" mode="light" onLeftClick={() => console.log('onLeftClick')}
          rightContent={[<Icon key="0" type="user" />, <Icon key="1" type="search" />, <Icon key="2" type="plus" />]}
        >NavBar</NavBar>
      </div>
    );
  },
});

ReactDOM.render(<ButtonExample />, document.getElementById('react-content'));
