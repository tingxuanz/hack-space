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

  var device_id = request.object.get('device_id');
  var status_data = request.object.get('data');
  console.log("id and data");
  console.log(device_id);
  console.log(status_data);

  var ruleQuery = new Parse.Query("Rule");
  ruleQuery.equalTo('targetDeviceId', device_id);
  ruleQuery.find({
  success: function(results) {
    console.log("get rule");
    var length = results.length;
    console.log(results[length - 1]);
  },
  error: function(error) {
    console.log("Error: " + error.code + " " + error.message)
  }
});

  var content = "test"
  T.post('statuses/update', { status: content }, function(err, data, response) {
    console.log(data)
  });

});
