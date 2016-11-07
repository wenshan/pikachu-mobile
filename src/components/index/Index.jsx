import React from 'react';
const ReactRouter = require('react-router');
let { Router, Route, browserHistory } = ReactRouter;
import { Breadcrumb } from 'antd';

// components
import Header from './header/Header';
import HeaderHorizontal from './header/HeaderHorizontal';
import Footer from './footer/Footer';
import Navi from './Navi';

// errors
import Error404 from '../error/404';

class IndexRoute extends React.Component {
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
      } else {
        routes.push(<Route key={item.key} breadcrumbName={item.title} path={_path}
          component={item.component}
        />);
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
  getChild() {
    return this.props.children || React.createElement(this.props.route.indexComponent);
  }

  render() {
    const props = this.props.route;
    if (props.mode === 'horizontal') {
      return (
              <div className="row full-height root-cnt">
                  <HeaderHorizontal {...props} />
                  <div className="app-cnt">
                      {this.getChild()}
                  </div>
                  <Footer {...props} />
              </div>
            );
    } else {
      return (
              <div className="row full-height root-cnt">
                  <div className="left-col full-height">
                      <Header.Logo {...props} />
                      <div className="navi-wrapper">
                          <div className="navi-inner-wrapper">
                              <Navi {...props} />
                          </div>
                      </div>
                  </div>
                  <div className="right-col">
                      <Header.Toolbar routes={this.props.routes} {...props} />
                      <div className="app-cnt">
                          {this.getChild()}
                      </div>
                      <Footer {...props} />
                  </div>
              </div>
            );
    }
  }
}

IndexRoute.defaultProps = {
  suffix: '.htm',
  mode: 'inline',
};

module.exports = IndexRoute;
