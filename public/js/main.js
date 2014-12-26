var host = location.origin.replace(/^http/, 'ws');
var ws = new WebSocket(host);
ws.onmessage = function (event) {
  var houses = JSON.parse(event.data);
  console.log(houses);
  for (var i = 0; i < houses.length; i++) {
    var houseSelector = '[data-house-id='+ houses[i].id +']';
    var houseElem = Sizzle(houseSelector);
    Sizzle(houseSelector+' .housename')[0].innerHTML = houses[i].name;
    Sizzle(houseSelector+' .housepoints')[0].innerHTML = houses[i].points;
  }
};
ws.onopen = function (event) {
  var buttons = Sizzle('button')
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function(e){
      var house = e.target.dataset.house;
      ws.send(house);
    };
  }
  console.log('opened');
};
