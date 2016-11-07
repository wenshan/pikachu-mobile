import React from 'react';
import { Button } from 'antd';
import Logo from './Logo';
const ReactRouter = require('react-router');
import { Breadcrumb } from 'antd';

class Header extends React.Component {
  render() {
    let name = 'unknow';
    if (this.props.user) {
      const user = this.props.user;
      if (user.name) {
        name = user.name;
      }
    }
    return (
          <header className="row header">
              <Breadcrumb routes={this.props.routes} />
              <div className="toolbox">
                  <Button type="ghost">
                      {name}
                  </Button>
              </div>
          </header>
        );
  }
}

module.exports = { Toolbar: Header, Logo };
