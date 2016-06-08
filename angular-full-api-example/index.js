/**
 * ENTER THIS INFORMATION BEFORE STARTING THE SERVER
 */

var APIKEY = "7119e691-efa3-436d-b028-945b719b355a";
var APIURL = "http://localhost:1337";

//var APIKEY = "1aca8be1-76b5-483d-a73f-5bd19c579ea1";
//var APIURL = "https://dev.bootlegger.tv";

//var APIKEY = "7ac72b06-70f3-46d4-9ccf-d6875345c3ea";
//var APIURL = "https://bootlegger.tv";

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
