var Twit = require('twit');

var T = new Twit({
consumer_key:         '8A5ftN1w5QPsHvEqCjYqOtiXo',
consumer_secret:      'KeO62KUcFemMazCCRTbCZwT5StoaaFPhuGq2FaCG6KLamqKVJl',
access_token:         '810308473732771840-Hx5lzVsBWncktOERXv3x2ZuHao5DizC',
access_token_secret:  'NverWhaMVEYzjVUbt4esVjqC2R91sQnQrHP771WMpLaPM',
timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('checkRule', function(req, res) {

});

Parse.Cloud.afterSave('RealtimeStatus', function(request) {
  console.log("show req");
  console.log(request);
  console.log("req done");

  var content = "test"
  T.post('statuses/update', { status: content }, function(err, data, response) {
    console.log(data)
  });

});
