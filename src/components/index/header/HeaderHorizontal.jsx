import React from 'react';
import { Button } from 'antd';
import Logo from './Logo';
import Navi from '../Navi';

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
            <header className="row header-horizontal">
                <Logo {...this.props} />
                <Navi {...this.props} />
                <div className="toolbox">
                    <Button type="ghost">
                        {name}
                    </Button>
                </div>
            </header>
        );
  }
}

module.exports = Header;
