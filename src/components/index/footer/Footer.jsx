import React from 'react';

class Footer extends React.Component {
  render() {
    return <div className="row footer">{this.props.footer}</div>;
  }
}

module.exports = Footer;
