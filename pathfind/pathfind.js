// boxes: 30x30
// 10 margin on each side => connectors are 20x30 / 30x20
const delay = 10;
// var height = 10;
// var width = 10;

const corner = '<div class="corner"></div>'
var searching = false
var selectingStart = false
var selectingEnd = false
var wallMode = false
var nodeStack = []

document.onmousedown = () => {wallMode = true}
document.onmouseup = () => {wallMode = false}


function widthSliderSetup() {
  widthRange = document.getElementById("widthRange");
  widthOutput = document.getElementById("widthOutput");
  widthOutput.innerHTML = widthRange.value;
  width = Number(widthRange.value)
  widthRange.oninput = function() {
    widthOutput.innerHTML = this.value;
    width = Number(this.value)
    genEnds()
    generateGrid()
  }
}
widthSliderSetup()

function heightSliderSetup() {
  heightRange = document.getElementById("heightRange");
  heightOutput = document.getElementById("heightOutput");
  heightOutput.innerHTML = heightRange.value;
  height = Number(heightRange.value)
  heightRange.oninput = function() {
    heightOutput.innerHTML = this.value;
    height = Number(this.value)
    genEnds()
    generateGrid()
  }
}
heightSliderSetup()

function genEnds() {
  startNode = [Math.floor(Math.random()*height), Math.floor(Math.random()*width)]
  endNode = [Math.floor(Math.random()*height), Math.floor(Math.random()*width)]
  while (endNode[0] == startNode[0] && endNode[1] == startNode[1]) {
    endNode = [Math.floor(Math.random()*height), Math.floor(Math.random()*width)]
  }
}

function generateGrid() {
  reset()
  genEnds()
  searching = false
  $('#container').css('pointer-events','all')
  $('#container').empty()
  $('#container').css({"width": String(width*25)+'px', "height": String(height*25)+'px'})
  $('#container').mouseleave(function(){wallMode=false})
  for (var i=0;i<height;i++) {
    for (var j=0;j<width;j++) {
      $("#container").append(boxDiv(i,j))
      box(i,j).mousedown(function(){
        wallMode = true
        $(this).toggleClass('wall')
      })
      box(i,j).attr('ontouchstart', $(this).toggleClass('wall'))
      box(i,j).mouseup(function(){
        wallMode = false
      })
      box(i,j).mouseenter(function(){
        if (wallMode) {
          $(this).toggleClass('wall')
        }
      })
    }
  }
  box(startNode[0],startNode[1]).addClass('startNode')
  box(endNode[0],endNode[1]).addClass('endNode')
}


function getNeighbours(i,j) {
  var nbd = []
  var containsEndNode = false
  if (i > 0) {
    if (!isVisited(i-1,j)) {
      nbd.push([i-1,j,'d'])
      if (endNode[0] == i-1 && endNode[1] == j) {containsEndNode=true}
    }
  }
  if (i < height-1) {
    if (!isVisited(i+1,j)) {
      nbd.push([i+1,j,'u'])
      if (endNode[0] == i+1 && endNode[1] == j) {containsEndNode=true}
    }
  }
  if (j > 0) {
    if (!isVisited(i,j-1)) {
      nbd.push([i,j-1,'r'])
      if (endNode[0] == i && endNode[1] == j-1) {containsEndNode=true}
    }
  }
  if (j < width-1) {
    if (!isVisited(i,j+1)) {
      nbd.push([i,j+1,'l'])
      if (endNode[0] == i && endNode[1] == j+1) {containsEndNode=true}
    }
  }
  return [nbd, containsEndNode]
}


function initPathFind() {
  if (searching) {return}
  searching = true
  $('#container').css('pointer-events','none')
  var [nbd, containsEndNode] = getNeighbours(startNode[0],startNode[1])
  if (containsEndNode) {
    return
  }
  BFS([[startNode[0],startNode[1]]])
  return nbd
}


function BFS(nodes) {
  var nbd = []
  if (nodes.length == 0) {return alert("No routes found.");}
  for (i=0;i<nodes.length;i++) {
    var currNode = nodes[i]
    var [currNbd, containsEndNode] = getNeighbours(currNode[0], currNode[1])
    if (containsEndNode) {return markPath(currNode[0],currNode[1])}
    for (j=0;j<currNbd.length;j++) {
      box(currNbd[j][0],currNbd[j][1]).addClass('visited')
      box(currNbd[j][0],currNbd[j][1]).addClass(currNbd[j][2])
      nbd.push(currNbd[j]);
    }
  }
  setTimeout(function() {BFS(nbd)}, delay)
}


function reset() {
  var id = window.setTimeout(function() {}, 0);
  console.log(id);
  while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
  enableSliders()
}



document.onkeypress = function (e) {
  if (e.key == ' ') {
    if (searching) {generateGrid()}
    else {initPathFind()}
  }
}


generateGrid()
enableSliders()
