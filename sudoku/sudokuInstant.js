function initInstantSolve() {
  var gridValues = [];
  var isSet = [];
  for (i=0;i<81;i++) {
    gridValues.push(boxes[i].innerHTML);
    if (boxes[i].classList.contains("set")) {
      isSet.push(true);
    } else {
      isSet.push(false);
    }
  }
  instantSolve(gridValues, isSet, 0);

  for (i=0;i<81;i++) {
    boxes[i].innerHTML = newGrid[i];
  }

}


function instantSolve(values, setValues, n) {
  if (setValues[n]) {;
    instantSolve(values, setValues, n+1);
  } else {
    if (values[n] == '') {
      values[n] = 1;
      if (instantCheckValues(values, n)) {     // !!!!!!
        instantSolve(values, setValues, n+1);
      } else {
        instantSolve(values, setValues, n);
      }

    } else if (values[n] == 9){
      values[n] = "";
      n--;
      while (setValues[n]) {
        n--;
      }
      instantSolve(values, setValues, n);

    } else {
      values[n] = parseInt(values[n]) + 1;

      if (instantCheckValues(values, n)) {
        if (n==80) {
          newGrid = values;
        } else {
          instantSolve(values, setValues, n+1);
        }
      } else {
        instantSolve(values, setValues, n);
      }
    }
  }
}


function instantCheckValues(values, n) {
  if (values[n]==0) {
    return
  }

  var idInSquare = n%3 + 9*Math.floor(n%27/9);
  var squareIds = [0,1,2,9,10,11,18,19,20]
  for (i=0;i<9;i++) {
    if (idInSquare != squareIds[i]) {
      var comparedId = n - idInSquare + squareIds[i]
      if (values[comparedId] == values[n]) {
        return false
      }
    }
  }

  for (i=9*Math.floor(n/9); i<9*(Math.floor(n/9)+1); i++) {
    if (i != n) {
      if (values[i] == values[n]) {
        return false
      }
    }
  }

  for (i=0;i<9;i++) {
    var comparedId = 9*i + n%9;
    if (comparedId != n) {
      if (values[comparedId] == values[n]) {
        return false
      }
    }
  }

  return true
}
