function initInstantSolve() {
  gridValues = [];
  isSet = [];
  for (i=0;i<81;i++) {
    gridValues.push(boxes[i].innerHTML);
    if (boxes[i].classList.contains("set")) {
      isSet.push(true);
    } else {
      isSet.push(false);
    }
  }
  console.log(isSet);;
  instantSolve(0);

  for (i=0;i<81;i++) {
    boxes[i].innerHTML = newGrid[i];
  }

}


function instantSolve(n) {
  if (isSet[n]) {;
    instantSolve(n+1);
  } else {
    if (gridValues[n] == '') {
      gridValues[n] = 1;
      if (instantCheckValues(n)) {     // !!!!!!
        instantSolve(n+1);
      } else {
        instantSolve(n);
      }

    } else if (gridValues[n] == 9){
      gridValues[n] = "";
      n--;
      while (isSet[n]) {
        n--;
      }
      instantSolve(n);

    } else {
      gridValues[n] = parseInt(gridValues[n]) + 1;

      if (instantCheckValues(n)) {
        if (n==80) {
          newGrid = gridValues;
        } else {
          instantSolve(n+1);
        }
      } else {
        instantSolve(n);
      }
    }
  }
}


function instantCheckValues(n) {
  if (gridValues[n]==0) {
    return
  }

  var idInSquare = n%3 + 9*Math.floor(n%27/9);
  var squareIds = [0,1,2,9,10,11,18,19,20]
  for (i=0;i<9;i++) {
    if (idInSquare != squareIds[i]) {
      var comparedId = n - idInSquare + squareIds[i]
      if (gridValues[comparedId] == gridValues[n]) {
        return false
      }
    }
  }

  for (i=9*Math.floor(n/9); i<9*(Math.floor(n/9)+1); i++) {
    if (i != n) {
      if (gridValues[i] == gridValues[n]) {
        return false
      }
    }
  }

  for (i=0;i<9;i++) {
    var comparedId = 9*i + n%9;
    if (comparedId != n) {
      if (gridValues[comparedId] == gridValues[n]) {
        return false
      }
    }
  }

  return true
}
