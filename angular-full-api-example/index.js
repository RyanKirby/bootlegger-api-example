/**
 * ENTER THIS INFORMATION BEFORE STARTING THE SERVER
 */

//You need to fill these in! Go to https://bootlegger.tv/api/signup to get your API Key

var APIKEY = "enter-api-key-here";//Enter you bootlegger api key here!
var APIURL = "https://bootlegger.tv"; //Enter bootlegger url here!

/**
 * DEMO SERVER CODE
 */
var express = require('express');
var session = require('express-session')
var app = express();
var REDIRECTURL = "http://localhost:3000/authcomplete";

app.use(session({
  secret: 'lkashdklajsdklajsdkljaskldjaklsdjaklsjd'
}));

//serve static files
app.use("/", express.static(__dirname + "/"));

//server primary enpoint
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

//get current bootlegger session key
app.get('/session', function (req, res) {
  res.json({session:req.session.sessionkey});
});

/*
 * This allows you to log into your Bootlegger account (and Bootlegger will redirect back to your web app)
 * Note: Remember to go to the API https://bootlegger.tv/api/signup and enter the url you want to be redirected back to!
 */
app.get('/auth', function (req, res) {
  res.redirect(APIURL + '/api/auth/login?apikey='+APIKEY);
});

/*
 * This is the what Bootlegger returns back to this server with the session key.
 */
app.get('/authcomplete', function (req, res) {
  req.session.sessionkey = req.query.session;
  req.session.save();
  res.redirect('/');
});

//logs out - empties session key
app.get('/logout', function(req, res){
  req.session.sessionkey = '';
  req.session.save();
  res.redirect('/');
});

//start server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
