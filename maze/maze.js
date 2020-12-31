// boxes: 30x30
// 10 margin on each side => connectors are 20x30 / 30x20
const delay = 10;
// var height = 10;
// var width = 10;

const corner = '<div class="corner"></div>'
var nodeStack = []

function initialiseGrid() {
  reset()
  disableSliders()
  $('#container').empty()
  $('#container').css({"width": String(width*50)+'px', "height": String(height*50)+'px'})
  for (var i=0;i<height;i++) {
    // above boxes
    for (var j=0;j<width;j++) {
      $("#container").append(corner)
      $("#container").append(uDiv(i,j))
      $("#container").append(corner)
    }
    // boxes and sides
    for (var j=0;j<width;j++) {
      $("#container").append(lDiv(i,j))
      $("#container").append(boxDiv(i,j))
      $("#container").append(rDiv(i,j))
    }
    // below boxes
    for (var j=0;j<width;j++) {
      $("#container").append(corner)
      $("#container").append(dDiv(i,j))
      $("#container").append(corner)
    }
  }


}


function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}



function getNeighbours(i,j) {
  var nbd = []
  if (i > 0) {
    if (!isVisited(i-1,j)) {
      nbd.push([i-1,j,'d'])
    }
  }
  if (i < height-1) {
    if (!isVisited(i+1,j)) {
      nbd.push([i+1,j,'u'])
    }
  }
  if (j > 0) {
    if (!isVisited(i,j-1)) {
      nbd.push([i,j-1,'r'])
    }
  }
  if (j < width-1) {
    if (!isVisited(i,j+1)) {
      nbd.push([i,j+1,'l'])
    }
  }
  shuffle(nbd)
  return nbd
}


function chooseEndPoint(endNodes) {
  endNode = endNodes[Math.floor(Math.random() * endNodes.length)]
  $('#' + box(endNode[0],endNode[1])).addClass('endNode')
}


function generateMaze() {
  initialiseGrid()

  var startNode = [Math.floor(Math.random()*height), Math.floor(Math.random()*width)]
  nodeStack.push(startNode)
  $('#'+box(startNode[0],startNode[1])).addClass('startNode')

  var endNodes = []

  function f() {
    if (nodeStack.length == 0) {
      enableSliders()
      return chooseEndPoint(endNodes)
    }
    currNode = nodeStack.pop()
    while (isVisited(currNode[0],currNode[1])) {
      if (nodeStack.length == 0) {
        enableSliders()
        return chooseEndPoint(endNodes)
      }
      currNode = nodeStack.pop()
    }

    nbd = getNeighbours(currNode[0],currNode[1])
    if (nbd.length == 0) {
      endNodes.push(currNode);
    } else {
      nodeStack = nodeStack.concat(nbd)
    }

    updateColours(currNode)


    setTimeout(function() {f()}, delay)
  }

  f()
}


function reset() {
  var id = window.setTimeout(function() {}, 0);
  console.log(id);
  while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
  enableSliders()
}


var widthRange = document.getElementById("widthRange");
var widthOutput = document.getElementById("widthOutput");
widthOutput.innerHTML = widthRange.value;
width = Number(widthRange.value)

widthRange.oninput = function() {
  widthOutput.innerHTML = this.value;
  width = Number(this.value)
}

var heightRange = document.getElementById("heightRange");
var heightOutput = document.getElementById("heightOutput");
heightOutput.innerHTML = heightRange.value;
height = Number(heightRange.value)

heightRange.oninput = function() {
  heightOutput.innerHTML = this.value;
  height = Number(this.value)
}

document.onkeypress = function (e) {
  if (e.key == ' ') {
    generateMaze()
  }
}


initialiseGrid()
enableSliders()
