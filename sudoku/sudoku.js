var i, j;
var boxes = document.getElementsByClassName('grid-item')
var delay = 0;
var currentGrid;

// Set IDs
for (i=0;i<boxes.length;i++) {
  boxes[i].id = i;
  boxes[i].innerHTML = i;
}


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

function formatGrid(grid) {
  var formatted = [];
  for (i=0;i<9;i++) {
    currentBox = [];
    for (j=0;j<9;j++) {
      var x = Math.floor(i/3) + Math.floor(j/3);
      var y = 3*(i%3) + j%3;
      formatted.push(grid[x][y])
    }
    // formatted.push(currentBox);
  }
  return formatted
}

function assignValues(grid) {
  // var values = formatGrid(grid);
  for (i=0;i<81;i++) {
    var value = grid[Math.floor(i/9)][i%9];
    if (value == 0) {
      boxes[i].innerHTML = '';
    } else {
      boxes[i].innerHTML = value;
      boxes[i].classList.add("set")
    }
  }
  currentGrid = grid;
}



function initSolve() {
  solve(0);
}

function solve(n) {
  if (boxes[n].classList.contains("set")) {
    if (n==80) {
      console.log("DONE");
    } else {
      solve(n+1);
    }
  } else {

    setTimeout(function() {

      if (boxes[n].innerHTML == '') {
        boxes[n].innerHTML = 1;
          if (checkValues(n)) {
            solve(n+1);
          } else {
            solve(n);
          }

      } else if (boxes[n].innerHTML == 9){
        boxes[n].innerHTML = "";
        n--;
        while (boxes[n].classList.contains("set")) {
          n--;
        }
        solve(n);

      } else {
        boxes[n].innerHTML = parseInt(boxes[n].innerHTML) + 1;

        if (checkValues(n)) {
          if (n==80) {
            console.log("DONE");
          } else {
            solve(n+1);
          }
        } else {
          solve(n);
        }
      }

    },delay)
  }
}

function checkValues(n) {
  if (boxes[n].innerHTML==0) {
    return
  }

  var idInSquare = n%3 + 9*Math.floor(n%27/9);
  var squareIds = [0,1,2,9,10,11,18,19,20]
  for (i=0;i<9;i++) {
    if (idInSquare != squareIds[i]) {
      var comparedId = n - idInSquare + squareIds[i]
      if (boxes[comparedId].innerHTML == boxes[n].innerHTML) {
        return false
      }
    }
  }

  for (i=9*Math.floor(n/9); i<9*(Math.floor(n/9)+1); i++) {
    if (i != n) {
      if (boxes[i].innerHTML == boxes[n].innerHTML) {
        return false
      }
    }
  }

  for (i=0;i<9;i++) {
    var comparedId = 9*i + n%9;
    if (comparedId != n) {
      if (boxes[comparedId].innerHTML == boxes[n].innerHTML) {
        return false
      }
    }
  }

  return true
}


function reset() {
  var id = window.setTimeout(function() {}, 0);
  console.log(id);
  while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
  assignValues(currentGrid)
}


assignValues(exampleUnformatted)
