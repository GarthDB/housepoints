var host = location.origin.replace(/^http/, 'ws');
var socket = new Primus(host);
socket.on('open', function () {
  var buttons = Sizzle('button')
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function(e){
      var house = e.target.dataset.house;
      socket.send('house', house);
      e.target.disabled = true;
    };
    buttons[i].addEventListener("touchend", function(e){
      var house = e.target.dataset.house;
      socket.send('house', house);
      e.target.disabled = true;
      e.preventDefault();
    }, false);
  }
  socket.on('house', function(msg) {
    var houses = msg;
    for (var i = 0; i < houses.length; i++) {
      var houseSelector = '[data-house-id='+ houses[i].id +']';
      var houseElem = Sizzle(houseSelector);
      Sizzle(houseSelector+' .housename')[0].innerHTML = houses[i].name;
      Sizzle(houseSelector+' .housepoints')[0].innerHTML = houses[i].points;
      var buttons = Sizzle(houseSelector+' button');
      for(var j = 0; j < buttons.length; j++) {
        buttons[j].disabled = false;
      }
    }
  });
});
