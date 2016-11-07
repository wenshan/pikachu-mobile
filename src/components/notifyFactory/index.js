

import { notification } from 'antd';

const openNotificationWithIcon = function (type, title, content) {
  return function () {
    notification[type]({
      message: title,
      description: content,
      duration: 5,
    });
  };
};

export default openNotificationWithIcon;
