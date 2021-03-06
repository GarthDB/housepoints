var Primus = require('primus.io');
var http = require("http");
var express = require("express");
var stylus = require("stylus");
var app = express();
var pub = __dirname + '/public';
var port = process.env.PORT || 5000;
var auth = require('http-auth');
var userid = process.env.userid || 'admin'; //TODO Setup basic auth
var pass = process.env.password || '12345';

var db = require('monk')(process.env.mongolab_uri);
var db_houses = db.get('houses');

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
{id: 1, name: 'Sabio', points: 'loading'},
{id: 2, name: 'Creativo', points: 'loading'},
{id: 3, name: 'Valeroso', points: 'loading'},
{id: 4, name: 'Amable', points: 'loading'}
];

app.get('/', function(req, res){
  res.render('scoreboard', {houses: houses});
});

app.get('/scorekeeper', authMiddleware, function(req, res){
  res.render('scorekeeper', {houses: houses});
});

app.get('/editpoints', authMiddleware, function(req, res){
  res.render('editpoints', {houses: houses});
});

var server = http.createServer(app)
server.listen(port)

/* Web Socket Server */

console.log("http server listening on %d", port);

var primus = new Primus(server, { transformer: 'websockets', parser: 'JSON' });
console.log("websocket server created")

primus.on('connection', function (spark) {
  console.log("websocket connection open");

  db_houses.find({}, {sort: {id: 1}}, function (err, docs) {
    houses = docs;
    spark.send('house', docs);
  });

  spark.on('house', function(message) {
    for (var i = 0; i < houses.length; i++) {
      if(houses[i].name == message) {
        db_houses.findAndModify({ _id: houses[i]._id }, { $inc:{points:1} }).on('success', function (doc) {
          houses[i] = doc;
          houses[i].points++;
          primus.forEach(function (spark, id, connections){
            spark.send('house', [houses[i]]);
          });
        });
        break;
      }
    }
    console.log(houses);
  });
  spark.on('houses', function(message) {
    var newHouses = message;
    console.log(newHouses.length);
    for (var i = 0; i < newHouses.length; i++) {
      console.log(newHouses[i]);
      db_houses.findAndModify({ id: newHouses[i].id }, { $set:{points:newHouses[i].points} }, {new: true}).on('success',
      function (doc) {
        houses[i] = doc;
        primus.forEach(function (spark, id, connections){
          spark.send('house', [houses[i]]);
        });
      });
    }
  });
})
