import React from 'react';
import { Link } from 'react-router';

import { Menu } from 'antd';

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

class Navi extends React.Component {
  hasVisibleChildren(menu) {
    let has = false;
    if (menu.children && menu.children.length) {
            // 只要有一个节点的visible不为false，has就为true
      has = !menu.children.every((item) => {
        return item.visible === false;
      });
    }
    return has;
  }

  generateMenuDom(menus, path) {
    const menuDoms = [];
    menus = menus || this.props.menus;
    path = path || '';
    menus.forEach((item) => {
      const p = item.key.length ? (`${path}/${item.key}`) : path;
      const hash = item.key.length ? this.props.suffix : '';
      const toObj = {
        pathname: p + hash,
      };
      if (item.visible !== false) {
        if (this.hasVisibleChildren(item)) {
          menuDoms.push(<SubMenu key={item.key}
            title={item.title}
          >{this.generateMenuDom(item.children, p)}</SubMenu>);
        } else {
          if (item.component) {
            menuDoms.push(<Item key={item.key}><Link to={toObj}>{item.title}</Link></Item>);
          } else {
            menuDoms.push(<Item disabled key={item.key}>{item.title}</Item>);
          }
        }
      }
    });
    return menuDoms;
  }

  render() {
    return (
          <Menu mode={this.props.mode}>
              {this.generateMenuDom()}
          </Menu>);
  }
}

module.exports = Navi;
