var host = location.origin.replace(/^http/, 'ws');
var socket = new Primus(host);

socket.on('open', function () {
  var form = Sizzle('#editPointsForm')[0];
  var inputs = Sizzle('input[type="number"]');
  var reset = Sizzle('#archivePoints')[0];
  var submit = Sizzle('#submit')[0]

  function disableButtons (flag) {
    var flag = typeof flag !== 'undefined' ?  flag : true;
    submit.disabled = flag;
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].disabled = flag;
    }
    reset.disabled = flag;
  }

  form.onsubmit = function() {
    disableButtons();
    var houses = [];
    for (var i = 0; i < inputs.length; i++) {
      house = {
        id: parseInt(inputs[i].dataset.houseId),
        name: inputs[i].dataset.house,
        points: parseInt(inputs[i].value)
      }
      houses.push(house);
    }
    socket.send('houses', houses);
    console.log(houses);
    return false;
  }
  reset.onclick = function() {
    disableButtons();
    var r = confirm("Are you sure you want to reset all the house points to zero?");
    if (r == true) {
      var houses = [];
      for (var i = 0; i < inputs.length; i++) {
        house = {
          id: parseInt(inputs[i].dataset.houseId),
          name: inputs[i].dataset.house,
          points: 0
        }
        houses.push(house);
      }
      socket.send('houses', houses);
    }
  }

  socket.on('house', function(msg) {
    var houses = msg;
    for (var i = 0; i < houses.length; i++) {
      var houseSelector = '[data-house-id='+ houses[i].id +']';
      var houseElem = Sizzle(houseSelector)[0];
      houseElem.value = houses[i].points;
    }
    disableButtons(false);
  });
});
