var facelist = require('..');
var getUserMedia = require('getusermedia');
var quickconnect = require('rtc-quickconnect');
var conference = quickconnect('//switchboard.rtc.io', {
  room: 'facelist-test'
});

function getRandomEmail() {
  var emails = [
    'damon.oehlman@gmail.com',
    'steelmesh@fluxant.com',
    'gamebase@fluxant.com'
  ];

  return emails[(Math.random() * emails.length) | 0];
}

facelist(conference);

conference
.createDataChannel('test');

// set a random email address
setTimeout(function() {
  conference.profile({ email: getRandomEmail() });
}, Math.random() * 1000);

// getUserMedia({ video: true }, function(err, stream) {
//   if (! err) {
//     conference.addStream(stream);
//   }
// });
