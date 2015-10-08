import React from 'react';


export class Subnav extends React.Component {
  render() {
    return (
      <nav className="page--subnav">
        <ul>
          {this.props.children}
        </ul>
      </nav>
    );
  }
}
