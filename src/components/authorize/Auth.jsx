/**
 * 权限拦截容器
 *
 * @author wenshan
 * @since 1.0.0
 */
import React from 'react';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deny: false,
      denyUrl: '',
    };
  }

  render() {
    if (this.props.deny || this.props.denyUrl) {
      return <a target="traffic_access_deny" href={this.props.denyUrl}>亲，您没有权限，请申请权限</a>;
    } else {
      return (<div>{this.props.children}</div>);
    }
  }
}

module.exports = Auth;
