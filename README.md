# facelist

An experiment using [mercury](https://github.com/Raynos/mercury) and
[rtc.io](https://github.com/rtc-io).


[![NPM](https://nodei.co/npm/facelist.png)](https://nodei.co/npm/facelist/)

[![bitHound Score](https://www.bithound.io/github/DamonOehlman/facelist/badges/score.svg)](https://www.bithound.io/github/DamonOehlman/facelist) 

## Example Usage

```js
var facelist = require('facelist')();
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

```

## License(s)

### MIT

Copyright (c) 2015 Damon Oehlman <damon.oehlman@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
