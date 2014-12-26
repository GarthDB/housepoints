var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var stylus = require("stylus");
var app = express();
var pub = __dirname + '/public';
var port = process.env.PORT || 5000;
var auth = require('http-auth');
var userid = process.env.userid || 'admin'; //TODO Setup basic auth
var pass = process.env.password || '12345';

var basic = auth.basic({
    realm: "Simon Area."
  }, function (username, password, callback) { // Custom authentication method.
    callback(username === userid && password === pass);
  }
);

var authMiddleware = auth.connect(basic);

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

var houses = [
{id: 1, name: 'Team 1', points: 1},
{id: 2, name: 'Team 2', points: 2},
{id: 3, name: 'Team 3', points: 3},
{id: 4, name: 'Team 4', points: 4}
];

app.get('/', function(req, res){
  res.render('scoreboard', {houses: houses});
});

app.get('/scorekeeper', authMiddleware, function(req, res){
  res.render('scorekeeper', {houses: houses});
});

var server = http.createServer(app)
server.listen(port)

/* Web Socket Server */

console.log("http server listening on %d", port);

var wss = new WebSocketServer({server: server});
console.log("websocket server created")

wss.on("connection", function(ws) {
  console.log("websocket connection open");
  clients.push(ws);

  ws.send(JSON.stringify(houses));

  ws.on('message', function(message) {
    for (var i = 0; i < houses.length; i++) {
      if(houses[i].name == message) {
        houses[i].points++;
        for(var j = 0; j < wss.clients.length; j ++){
          wss.clients[j].send(JSON.stringify([houses[i]]));
        }
        break;
      }
    }
    console.log(houses);
  });
})
