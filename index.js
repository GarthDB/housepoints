var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var stylus = require("stylus");
var app = express();
var pub = __dirname + '/public';
var port = process.env.PORT || 5000;
var userid = process.env.userid || 'admin';
var passid = process.env.password || '12345';

app.use(stylus.middleware(
  { src: __dirname + '/public'
    , compile: function (str, path) {
      return stylus(str)
      .set('filename', path)
    }
  }
));

app.use(express.static(pub));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.render('scoreboard', {houses: [
    {name: 'yo', points: 1},
    {name: 'yup', points: 2},
    {name: 'too', points: 3},
    {name: 'totes', points: 4}
  ]});
});

app.get('/scorekeeper', function(req, res){
  res.render('scorekeeper', {houses: [
    {name: 'yo', points: 1},
    {name: 'yup', points: 2},
    {name: 'too', points: 3},
    {name: 'totes', points: 4}
  ]});
});

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify(new Date()), function() {  })
  }, 1000)

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
})
