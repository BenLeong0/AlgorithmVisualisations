var i, j;
var boxes = document.getElementsByClassName('grid-item')
var delay = 0;
var currentGrid;
var midSolve = false;


function clearReadOnlys() {
  for (i=0;i<81;i++) {
    if (!boxes[i].classList.contains("set")) {
      boxes[i].childNodes[0].readOnly = false;
    }
  }
}


function clearRed() {
  this.parentElement.classList.remove('incorrect');
}


function bgCheck() {
  var checkBox = document.getElementById("bgCheck");
  var container = document.getElementById("container");
  if (checkBox.checked == true){
    container.style.backgroundColor = "rgba(0,0,0,1)";
  } else {
    container.style.backgroundColor = "rgba(0,0,0,0)";
  }
}


function checkValues(n) {
  var i,n;
  var digits = ["1","2","3","4","5","6","7","8","9"];
  if (!(digits.includes(boxes[n].childNodes[0].value))) {
    return false
  }

  var idInSquare = n%3 + 9*Math.floor(n%27/9);
  var squareIds = [0,1,2,9,10,11,18,19,20]
  for (i=0;i<9;i++) {
    if (idInSquare != squareIds[i]) {
      var comparedId = n - idInSquare + squareIds[i]
      if (boxes[comparedId].childNodes[0].value == boxes[n].childNodes[0].value) {
        return false
      }
    }
  }

  for (i=9*Math.floor(n/9); i<9*(Math.floor(n/9)+1); i++) {
    if (i != n) {
      if (boxes[i].childNodes[0].value == boxes[n].childNodes[0].value) {
        return false
      }
    }
  }

  for (i=0;i<9;i++) {
    var comparedId = 9*i + n%9;
    if (comparedId != n) {
      if (boxes[comparedId].childNodes[0].value == boxes[n].childNodes[0].value) {
        return false
      }
    }
  }

  return true
}


function checkAnswer() {
  var success = true;
  var n;
  for (n=0;n<81;n++) {
    boxes[n].classList.remove("incorrect");
    if (!checkValues(n) && !boxes[n].classList.contains("set")) {
      if (boxes[n].childNodes[0].value != 0) {boxes[n].classList.add("incorrect")}
      success = false;
    }
  }
  if (success) {
    alert("Congratulations!");
    for (n=0;n<81;n++) {boxes[n].classList.add("complete")}
  }
  else {alert("Answer is wrong or incomplete.")}
}


function checkWhileSolving() {
  var check = true;
  for (i=0;i<81;i++) {
    if (boxes[i].childNodes[0].value != 0 && !boxes[i].classList.contains("set")) {
      if (!checkValues(i)) {
        check = false;
        boxes[i].classList.add("incorrect");
      }
    }
  }
  return check;
}


function removeTimeouts() {
  var id = window.setTimeout(function() {}, 0);
  console.log(id);
  while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
}


function reset() {
  var id = window.setTimeout(function() {}, 0);
  midSolve = false;
  console.log(id);
  while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
  assignValues(currentGrid)
}


function emptyBoard() {
  assignValues([
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
  ])
}


function stringToGrid(stringInput) {
  var grid = [];
  var x, y;
  for (x=0;x<9;x++) {
    var line = [];
    for (y=0;y<9;y++) {
      line.push(stringInput[9*x+y]);
    }
    grid.push(line);
  }
  return grid
}


function randomGrid() {
  var id = Math.floor(grids.length * Math.random())
  assignValues(stringToGrid(grids[id]))
}


function assignValues(grid) {
  for (i=0;i<81;i++) {
    boxes[i].classList.remove("incorrect")
    boxes[i].classList.remove("complete")
    var value = grid[Math.floor(i/9)][i%9];
    if (value == 0) {
      boxes[i].childNodes[0].value = '';
      boxes[i].childNodes[0].readOnly = false;
      boxes[i].classList.remove("set")
    } else {
      boxes[i].childNodes[0].value = value;
      boxes[i].childNodes[0].readOnly = true;
      boxes[i].classList.add("set")
    }
  }
  currentGrid = grid;
}


randomGrid()
