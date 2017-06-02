var Twit = require('twit');

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('checkRule', function(req, res) {

});

Parse.Cloud.afterSave('RealtimeStatus', function(request) {
  console.log(request);

  var T = new Twit({
  consumer_key:         '...',
  consumer_secret:      '...',
  access_token:         '...',
  access_token_secret:  '...',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

//
//  tweet 'hello world!'
//
var content = "test"
T.post('statuses/update', { status: content }, function(err, data, response) {
  console.log(data)
})

});
