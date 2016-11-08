

import { Toast } from 'antd-mobile';

const openNotificationWithIcon = function (type, content) {
  return function () {
    Toast[type](content);
  };
};

export default openNotificationWithIcon;
