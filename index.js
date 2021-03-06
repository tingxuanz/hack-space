// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var serveStatic = require('serve-static');
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || '4QKhC5sL4BCBui2aNuiac4mSuOTXJILnOf3MP1fG',
  masterKey: process.env.MASTER_KEY || 'OU8Fk4O6qeGzl6Ikcg0F9msWdq2iAsor9Vn96jZT', //Add your master key here. Keep it secret!
  restAPIKey: process.env.REST_API_KEY || 'Uov2RPdBByNcTGZ0EvLqqTCSuFqylkJv8jjlwywf',
  javascriptKey: process.env.JAVASCRIPT_KEY || 'jcAkgMYW30JRqAj7EQYtg4sxa2poD2d1nopy2s9x',
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["RealtimeStatus"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
// app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);



app.use(serveStatic('./hackspace.client', {'index': ['index.html', 'index.html']}));

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
