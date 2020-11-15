var i;

function addBar(val) {
  newBar = "<div class='bar' value='" + val + "'></div>";
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

function getValue(i) {
  var bars = document.getElementsByClassName("bar")
  return Number(bars[i].getAttribute('value'))
}

function resizeBars() {
  var bars = document.getElementsByClassName("bar")
  var boxHeight = document.getElementById("container").style.height
  var values = []

  /* Assign bar widths, and retrieve values */
  var i = 0
  for (i=0; i<bars.length; i++) {
    bars[i].style.width = 90/bars.length + '%'
    bars[i].style.marginLeft = 5/bars.length + '%'
    bars[i].style.marginRight = 5/bars.length + '%'
    values.push(getValue(i))
  }

  /* Assign bar heights */
  maxValue = Math.max(...values)
  var i = 0
  for (i=0; i<bars.length; i++) {
    bars[i].style.height = 100 * getValue(i) / maxValue + '%'
  }

  /* Remove all whitespace */
  while (document.getElementById("container").outerHTML != document.getElementById("container").outerHTML.replace("> ", '>')
         || document.getElementById("container").outerHTML != document.getElementById("container").outerHTML.replace(">\n", '>')) {
      document.getElementById("container").outerHTML = document.getElementById("container").outerHTML.replace("> ", '>')
      document.getElementById("container").outerHTML = document.getElementById("container").outerHTML.replace(">\n", '>')
  }
}

resizeBars()
// console.log('ready....')
// setTimeout(function(){console.log('go!')}, 1000);
