
import React from 'react';
import notifyFactory from '../notifyFactory/index';

class AuthUrl extends React.Component {
  constructor(opt) {
    super(opt);
  }
  render() {
    const { url } = this.props;
    return (<a href={url}>权限申请地址</a>);
  }
}


export default function permission(data) {
  if (data && data.accessDeny) {
    const url = data && data.authUrl;
    const urlComp = <AuthUrl url={url} />;
    notifyFactory('error', '没有权限', urlComp)();
  }
}

