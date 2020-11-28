var i, j;
var boxes = document.getElementsByClassName('grid-item')
var delay = 0;
var currentGrid;
var midSolve = false;

// Set IDs
// for (i=0;i<boxes.length;i++) {
//   boxes[i].id = i;
//   boxes[i].innerHTML = i;
// }


exampleUnformatted = [
  [8,0,0,9,0,0,0,0,4],
  [0,3,2,0,0,0,5,7,0],
  [0,0,0,0,4,0,8,0,0],
  [0,0,0,8,0,5,0,0,1],
  [0,0,5,0,9,0,6,0,0],
  [1,0,0,3,0,2,0,0,0],
  [0,1,9,0,2,0,0,6,0],
  [0,2,0,0,0,0,0,1,0],
  [7,0,0,0,0,9,0,0,8]
]

// Impossible grid
// exampleUnformatted = [
//   [8,0,0,9,0,0,0,0,4],
//   [1,3,2,0,0,0,5,7,0],
//   [0,0,4,0,4,0,8,0,0],
//   [0,0,6,8,0,5,0,0,1],
//   [0,0,5,0,9,0,6,0,0],
//   [1,0,7,3,0,2,0,0,0],
//   [0,1,9,0,2,0,0,6,0],
//   [0,2,0,0,0,0,0,1,0],
//   [7,0,0,0,0,9,0,0,8]
// ]

// exampleUnformatted = [
//   [0,0,0,8,0,4,5,0,0],
//   [0,0,9,6,0,3,0,7,0],
//   [0,3,7,0,2,0,0,0,0],
//   [9,1,0,0,0,0,0,2,6],
//   [0,0,2,0,0,0,1,0,0],
//   [6,7,0,0,0,0,0,4,8],
//   [5,0,0,0,8,0,4,1,0],
//   [0,9,0,1,0,2,8,0,0],
//   [0,0,0,5,0,9,0,0,0]
// ]

function assignValues(grid) {
  // var values = formatGrid(grid);
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

function clearReadOnlys() {
  for (i=0;i<81;i++) {
    if (!boxes[i].classList.contains("set")) {
      boxes[i].childNodes[0].readOnly = false;
    }
  }
}


function checkValues(n) {
  var i,n;
  if (boxes[n].childNodes[0].value==0) {
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


function removeTimeouts() {
  var id = window.setTimeout(function() {}, 0);
  console.log(id);
  while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
}


function reset() {
  var id = window.setTimeout(function() {}, 0);
  console.log(id);
  while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
  assignValues(currentGrid)
}

function clearRed() {
  this.parentElement.classList.remove('incorrect');
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


assignValues(exampleUnformatted)
