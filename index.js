var i;
var delay = 10

function addBar(val) {
  newBar = "<div class='bar' value='" + val +
            "'><div class='label'>"+val+"</div></div>";
  // newBar = "<div class='bar' value='" + val + "'></div>";
  document.getElementById('container').innerHTML += newBar
  resizeBars()
}

function removeBar() {
  var bars = document.getElementsByClassName("bar")
  bars[bars.length-1].remove()
  resizeBars()
}

function swapBars(m,n) {
  var bars = document.getElementsByClassName("bar")
  if (m >= bars.length || n >= bars.length) {
    return console.log('uh oh, bar id is out of range!')
  } else if (m == n) {
    return console.log('same bar dummy!')
  } else {
    // Swap the bars!!
    var box = document.getElementById("container")
    var minId = Math.min(m,n);
    var maxId = Math.max(m,n);
    box.insertBefore(bars[maxId], bars[minId].nextElementSibling)
    box.insertBefore(bars[minId], bars[maxId].nextElementSibling)
    resizeBars()
  }
}

function initBars(array) {
  document.getElementById("container").innerHTML = ''
  var i = 0
  for (i=0; i<array.length; i++) {
    addBar(array[i])
  }
  resizeBars()
}

function toggleGreen(n) {
  document.getElementsByClassName("bar")[n].classList.toggle("green");
}

function toggleRed(n) {
  document.getElementsByClassName("bar")[n].classList.toggle("red");
}

function toggleDone(n) {
  document.getElementsByClassName("bar")[n].classList.toggle("done");
}

function getValue(i) {
  var bars = document.getElementsByClassName("bar")
  return Number(bars[i].getAttribute('value'))
}

function resizeBars() {
  var bars = document.getElementsByClassName("bar")
  var labels = document.getElementsByClassName("label")
  var values = []

  /* Assign bar widths, and retrieve values */
  var i = 0
  for (i=0; i<bars.length; i++) {
    // Not percentages so that it's consistent through bars
    bars[i].style.width = Math.floor(900/bars.length) + 'px'
    bars[i].style.marginLeft = Math.floor(50/bars.length) + 'px'
    // At least 1px, but can't use Math.ceil else sometimes too wide
    bars[i].style.marginRight = Math.max(1, Math.floor(50/bars.length)) + 'px'
    if (bars.length>60) {
      labels[i].style.fontSize = Math.floor(900/bars.length) + 'px'
      labels[i].style.writingMode = "vertical-rl"
    }
    values.push(getValue(i))
  }

  /* Assign bar heights */
  maxValue = Math.max(...values)
  var i = 0
  for (i=0; i<bars.length; i++) {
    bars[i].style.paddingTop = 50 * getValue(i) / maxValue + '%'
  }

  /* Remove all whitespace */
  while (document.getElementById("container").outerHTML != document.getElementById("container").outerHTML.replace("> ", '>')
         || document.getElementById("container").outerHTML != document.getElementById("container").outerHTML.replace(">\n", '>')) {
      document.getElementById("container").outerHTML = document.getElementById("container").outerHTML.replace("> ", '>')
      document.getElementById("container").outerHTML = document.getElementById("container").outerHTML.replace(">\n", '>')
  }
}

function noOverride() {
  const bars = document.getElementsByClassName("bar");
  var allDone = true;
  var noneDone = false;
  for (i=0; i<bars.length; i++) {
    if (bars[i].classList.contains("green") || bars[i].classList.contains("red")) {
      return false
    }
    if (bars[i].classList.contains("done")) {
      noneDone = true;
    } else {
      allDone = false;
    }
  }
  if (noneDone && !allDone) {
    return false
  }
  return true
}

function getValues(){
  values = []
  for (i=0; i<barNumber; i++) {
    values.push(getValue(i))
  }
  return values
}

function genRandomBars(n) {
  values = []
  for (i=0; i<n; i++) {
    values.push(Math.ceil(Math.random() * n))
  }
  initBars(values)
}

function reset() {
  var id = window.setTimeout(function() {}, 0);
  console.log(id);
  while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
}



resizeBars()
// console.log('ready....')
// setTimeout(function(){console.log('go!')}, 1000);

var slider = document.getElementById("barRange");
var output = document.getElementById("barOutput");
output.innerHTML = slider.value;
barNumber = Number(slider.value)

slider.oninput = function() {
  output.innerHTML = this.value;
  barNumber = Number(this.value)
}
