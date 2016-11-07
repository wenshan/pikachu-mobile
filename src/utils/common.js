
import Cookies from 'js-cookie';

const Utils = {
  merge() {
    const ret = {};
    const args = [].slice.call(arguments, 0);
    args.forEach((a) => {
      Object.keys(a).forEach((k) => {
        ret[k] = a[k];
      });
    });
    return ret;
  },
  login(param) {
    Cookies.remove('user_data', { path: '/' });
    Cookies.remove('com.gooagoo.passpart.sso.token.name', { path: '/', domain: window.Domain });
    if (param == 'out') {
      window.location.href = `https://passport${window.Domain}/index.html`;
    } else {
      window.location.href = `https://passport${window.Domain}/index.html?service=${window.location.host}`;
    }
  },
};


module.exports = Utils;

