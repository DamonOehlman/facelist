var defaultcss = require('defaultcss');
var fs = require('fs');
var ObservConference = require('observ-conference');
var gravatar = require('gravatar');
var h = require('virtual-hyperscript');

/**
  # facelist

  An experiment using [mercury](https://github.com/Raynos/mercury) and
  [rtc.io](https://github.com/rtc-io).

  ## Example Usage

  <<< examples/simple.js

**/

// declare view rendering.
module.exports = function(opts) {
  defaultcss('facelist', fs.readFileSync(__dirname + '/default.css', 'utf8'));

  return function(state) {
    var children = state.peers.map(function(item) {
      var parts = [];
      var classes = [item.connected ? 'active' : 'inactive'];
      var avatar = item.avatar || (item.email && gravatar.url(item.email));

      if (avatar) {
        parts.push(h('img', {
          className: classes.join(' '),
          title: item.id,
          src: gravatar.url(item.email)
        }));
      }

      return h('div.avatar', { className: item.local ? 'local' : '' }, h('div.aspect', parts));
    });

    return h('div.facelist', children);
  };
};
