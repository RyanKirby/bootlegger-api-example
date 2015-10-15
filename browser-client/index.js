/**
 * ENTER THIS INFORMATION BEFORE STARTING THE SERVER
 */
var APIKEY = "0bdf30fb-871e-45bd-b1f3-febd5160f6a3";
var APIURL = "http://localhost:1337";

/**
 * DEMO SERVER CODE
 */
var express = require('express');
var session = require('express-session')
var app = express();
var REDIRECTURL = "";

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

//initiate bootlegger auth
app.get('/auth', function (req, res) {
  res.redirect(APIURL + '/api/auth/login?apikey='+APIKEY);
});

//return endpoint for bootlegger returning session key
app.get('/authcomplete', function (req, res) {
  req.session.sessionkey = req.query.session;
  req.session.save();
  res.redirect('/');
});

//start server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});