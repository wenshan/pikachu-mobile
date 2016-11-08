import React from 'react';
const ReactRouter = require('react-router');
let { Router, Route, browserHistory } = ReactRouter;
import { Drawer, List, NavBar } from 'antd-mobile';

// components
import Header from './header/Header';
import HeaderHorizontal from './header/HeaderHorizontal';
import Footer from './footer/Footer';
import Navi from './Navi';

// errors
import Error404 from '../error/404';

class IndexRoute extends React.Component {
  getInitialState() {
    return {
      open: false,
      position: 'left',
    };
  }

  getPathKey(k) {
    return k + this.props.suffix;
  }

  generateMenuRouter(menus, path) {
    const routes = [];
    menus = menus || this.props.menus;
    path = path || '';
    menus.forEach((item) => {
      const p = item.key.length ? (`${path}/${item.key}`) : path;
      const _path = item.component ? this.getPathKey(p) : p;
      if (item.children && item.children.length) {
        routes.push(<Route key={item.key} breadcrumbName={item.title} path={_path}
          component={item.component}
        >{this.generateMenuRouter(item.children, p)}</Route>);
      }
    });
    return routes;
  }

  render() {
    return (
          <Router history={browserHistory}>
              <Route path="/" component={Index} breadcrumbName="" {...this.props}>
                  {this.generateMenuRouter()}
                  <Route path="*" component={Error404} />
              </Route>
          </Router>
        );
  }
}

class Index extends React.Component {
  render() {
    const props = this.props.route;
    return(
      <div>
        <NavBar iconName="ellipsis" onLeftClick={() => this.onDock('docked')}>嵌入文档</NavBar>
        <Drawer sidebar={<Navi {...props} />}
          dragHandleStyle={{ display: 'none' }}
          sidebarStyle={{ border: '1px solid #ddd' }}
          contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
          {...drawerProps}
        >
        </Drawer>
      </div>
    );
  }
}

IndexRoute.defaultProps = {
  suffix: '.htm',
  mode: 'inline',
};

module.exports = IndexRoute;
