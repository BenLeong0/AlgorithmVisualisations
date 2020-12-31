// boxes: 30x30
// 10 margin on each side => connectors are 20x30 / 30x20



function reset() {
  var id = window.setTimeout(function() {}, 0);
  console.log(id);
  while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
}


var slider = document.getElementById("barRange");
var output = document.getElementById("barOutput");
output.innerHTML = slider.value;
n = Number(slider.value)

slider.oninput = function() {
  output.innerHTML = this.value;
  n = Number(this.value)
}
