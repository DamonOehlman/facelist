var facelist = require('..')();
var getUserMedia = require('getusermedia');
var quickconnect = require('rtc-quickconnect');
var conference = quickconnect('https://switchboard.rtc.io', { room: 'facelist:demo' });
var hg = require('mercury');
var h = hg.h;

var state = hg.state({
  peers: require('observ-conference')(conference)
});

function getRandomEmail() {
  var emails = [
    'damon.oehlman@gmail.com',
    'steelmesh@fluxant.com',
    'gamebase@fluxant.com'
  ];

  return emails[(Math.random() * emails.length) | 0];
}

function render(state) {
  return h('div#main', [
    facelist(state.peers)
  ]);
}

conference.createDataChannel('test');

// set a random email address
setTimeout(function() {
  conference.profile({ email: getRandomEmail() });
}, Math.random() * 1000);

getUserMedia({ video: true }, function(err, stream) {
  if (! err) {
    conference.addStream(stream);
  }
});

hg.app(document.body, state, render);
