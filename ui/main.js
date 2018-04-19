var button = document.getElementById('counter');
button.onclick = function () {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if(request.readyState === XMLHttpRequest.DONE) {
      if(request.status === 200) {
        var counter = request.responseText;
        var span = document.getElementById('count');
        span.innerHTML = counter.toString();
      }
    }
  };

  request.open('GET', 'http://localhost:8080/counter', true);
  request.send(null);
};

var submit = document.getElementById('submit_btn');
submit.onclick = function () {
  var name = document.getElementById('name').value;
  console.log(name);
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if(request.readyState === XMLHttpRequest.DONE) {
      if(request.status === 200) {
        var list = JSON.parse(request.responseText);
        var p = '';
        for(var i = 0; i < list.length; i++) {
            p += '<li>' + list[i] + '</li>';
        }
        var ul = document.getElementById('namelist');
        ul.innerHTML = p;
      }
    }
  };

  request.open('GET', 'http://localhost:8080/submit-btn/' + name, true);
  request.send(null);
};
