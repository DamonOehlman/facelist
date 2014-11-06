var defaultcss = require('defaultcss');
var fs = require('fs');
var ObservConference = require('observ-conference');
var gravatar = require('gravatar');
var hg = require('mercury');
var h = require('mercury').h;

/**
  # facelist

  An experiment using [mercury](https://github.com/Raynos/mercury) and
  [rtc.io](https://github.com/rtc-io).

  ## Example Usage

  To be completed.

**/

function App(conference) {
  return ObservConference(conference);
}

// declare view rendering.
App.render = function render(state) {
  var children = state.map(function(item) {
    var parts = [];
    var classes = [item.connected ? 'active' : 'inactive'];
    var avatar = item.avatar || (item.email && gravatar.url(item.email));

    if (item.streams.length > 0) {
      console.log(item.streams[0]);
      parts.push(h('video', {
        autoplay: true,
        src: URL.createObjectURL(item.streams[0])
      }));
    }
    else if (avatar) {
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

function incrementCounter(state) {
    state.value.set(state.value() + 1);
}

module.exports = function(conference, opts) {
  var container = (opts || {}).container || require('global/document').body;

  defaultcss('facelist', fs.readFileSync(__dirname + '/default.css', 'utf8'));
  hg.app(container, App(conference), App.render);
};

