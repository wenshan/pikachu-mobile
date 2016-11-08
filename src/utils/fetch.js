
import qwest from 'qwest';
import { Toast } from 'antd-mobile';
import utils from './common.js';
import Auth from '../components/authorize/Auth';
import Cookies from 'js-cookie';
import React from 'react';

const showError = function (msg) {
  Toast.info(msg);
};

const notice = {
  INVOKE_ERROR: '调用后台接口出错，请联系管理员',
  AUTH_FAIL: '亲，您没有权限，请申请权限',
};

const adapter = function (data) {
  return data;
};

const token = function () {
  const key = 'com.gooagoo.passpart.sso.token.name';
  return Cookies.get(key);
};

const defaultOptions = {
  method: 'post',
  data: {
    token: token(),
  },
  type: 'json',
  adapter, // resultDTO解析方法
  alertError: true, // 是否弹出错误提示窗口
  alertDenyAccess: false, // 是否弹出没有权限提示窗口
  parallel: false, // 是否并行发送批量请求
  isSuccess(xhr, resp) { // 自定义逻辑判断是否成功
    return resp.status === 'S' || resp.success === true;
  },
  isAccessDeny(xhr, resp) { // 判断是否没有权限
    return resp.statusCode == '403' && resp.data;
  },
  getAuthUrl(xhr, resp) { // 获取授权url
    return 'https://passport.gooagoo.com/index.html';
  },
};

const fetchMany = function (options) {
  let { url, method } = options;
  let temp = qwest;
  url.forEach(u => {
    temp = temp[method](u);
  });
  return new Promise((resolve, reject) => {
    temp.then(ans => {
      ans.forEach(item => {
        let xhr = item[0],
          response = item[1];
        if (typeof response == 'string' && (options.type === 'json' || options.type === 'jsonp')) {
          response = JSON.parse(response);
        }
        response = options.adapter(response);
        if (!options.isSuccess(xhr, response)) {
          reject(ans, item);
        }
      });
      resolve(ans);
    }).catch((e, xhr, resp) => {
      options.alertError && showError(notice.INVOKE_ERROR);
      reject({
        xhr,
        resp,
      });
    });
  });
};

const Fetch = function (options) {
  options = utils.merge({}, defaultOptions, options);
  let { parallel = false } = options;
    // 并行的请求
  if (parallel) {
    return fetchMany(options);
  }
  return new Promise((resolve, reject) => {
    qwest[options.method](options.url, options.data, options).then((xhr, resp) => {
      if (typeof resp == 'string' && (options.type === 'json' || options.type === 'jsonp')) {
        resp = JSON.parse(resp);
      }
      resp = options.adapter(resp);
      if (options.isSuccess(xhr, resp)) {
        resolve(resp);
      } else {
        const errorMsg = resp.errorMsg || notice.INVOKE_ERROR;
        let accessDeny = false,
          authUrl = '';
        if (options.isAccessDeny(xhr, resp)) { // 没有权限
          authUrl = options.getAuthUrl(xhr, resp);
          accessDeny = true;
          if (options.alertDenyAccess) {
            showError(<Auth denyUrl={authUrl}></Auth>);
          }
        } else {
          options.alertError && showError(errorMsg);
        }
        reject({
          accessDeny,
          authUrl,
          resp,
          xhr,
        });
      }
    }).catch((e, xhr, resp) => {
      options.alertError && showError(notice.INVOKE_ERROR);
      reject({
        xhr,
        resp,
      });
    });
  });
};

module.exports = Fetch;
