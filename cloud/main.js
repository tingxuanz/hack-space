var Twit = require('twit');

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});
