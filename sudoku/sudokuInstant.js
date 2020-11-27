function initInstantSolve() {
  gridValues = [];
  isSet = [];
  for (i=0;i<81;i++) {
    boxes[i].childNodes[0].readOnly = true;
    if (boxes[i].childNodes[0].value == '') {
      gridValues.push(0)
    } else {
      gridValues.push(parseInt(boxes[i].childNodes[0].value));
      isSet.push(true)
    }
    if (boxes[i].classList.contains("set")) {
      isSet.push(true);
    // } else {
    //   isSet.push(false);
    }
  }
  var solvable = instantSolve(0);

  if (solvable) {
    for (i=0;i<81;i++) {
      boxes[i].childNodes[0].value = gridValues[i];
    }
  }

}


function instantSolve(n) {
  var solved = false;
  var currentValue = 0;
  if (isSet[n]) {
    if (n == 80) return true
    solved = instantSolve(n+1);
    if (n == 0 && !solved) {return alert("This sudoku is unsolvable")};
    return solved;
  } else {
    while (!solved) {
      if (currentValue==9) {
        if (n==0) {return alert("This sudoku is unsolvable");}
        gridValues[n] = 0;
        return false
      }
      currentValue++;
      gridValues[n]=currentValue;
      if (instantCheckValues(n)) {
        if (n == 80) return true
        solved = instantSolve(n+1);
      }
    }
  }
  return true
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
