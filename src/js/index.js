'use strict';

var $ = require('sizzle');
var Content = require('./router');
var Footer = require('./footer');
var Header = require('./header');
var React = window.React = require('react');

var Main = React.createClass({
  render: function () {
    return <Content />;
  }
});

Main.start = function () {
  React.render(<Header/>, $('body > header')[0]);
  React.render(<Main/>, $('body > main')[0]);
  React.render(<Footer/>, $('body > footer')[0]);
};

module.exports = window.Main = Main;
