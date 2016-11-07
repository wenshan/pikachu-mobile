import React from 'react';
import { Link } from 'react-router';

class Logo extends React.Component {
  render() {
    return (
            <div className="logo"><Link to=""><h1>{this.props.name}</h1></Link></div>
        );
  }
}

module.exports = Logo;
