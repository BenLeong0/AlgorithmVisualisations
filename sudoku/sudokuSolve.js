function initSolve() {
  if (!checkWhileSolving()) {return alert("There are inconsistencies!")}

  for (i=0;i<81;i++) {
    boxes[i].childNodes[0].readOnly = true;
    boxes[i].classList.remove("userInput");
    if (boxes[i].childNodes[0].value != 0 && !boxes[i].classList.contains("set"))
      {
        boxes[i].classList.add("userInput")
      }
    }
  solve(0);
}

function solve(n) {
  if (boxes[n].classList.contains("set") || boxes[n].classList.contains("userInput")) {
    if (n==80) {
      console.log("DONE");
    } else {
      solve(n+1);
    }

  } else {
    setTimeout(function() {

      if (boxes[n].childNodes[0].value == 0) {
        boxes[n].childNodes[0].value = 1;
          if (checkValues(n)) {
            solve(n+1);
          } else {
            solve(n);
          }

      } else if (boxes[n].childNodes[0].value == 9){
        boxes[n].childNodes[0].value = "";
        n--;
        while (boxes[n].classList.contains("set") || boxes[n].classList.contains("userInput")) {
          if (n==0) {clearReadOnlys(); return alert("This sudoku is unsolvable");}
          n--;
        }
        solve(n);

      } else {
        boxes[n].childNodes[0].value = parseInt(boxes[n].childNodes[0].value) + 1;
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
