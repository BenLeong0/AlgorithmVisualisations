function pick_pivot(l, r) {
  //return l;
  // return r - 2;
  return Math.floor((l+r)/2);
  // return Math.floor(Math.random() * (r-l) + l);
}

function quicksort(l,r,length) {
  outerLoopDone = false
  var bars = document.getElementsByClassName("bar");
  if (l>=r) {
    if (l < bars.length) {
      bars[l].classList.add('done')
      bars[l].classList.remove('green')
    }
    outerLoopDone = true
  } else {
    pos = pick_pivot(l,r)

    var box = document.getElementById("container");
    bars[pos].classList.add('green');
    var i, prevId;
    var loopDone = false;

    (function myLoop(i) {
      setTimeout(function() {
        if (prevId != null) {
          bars[prevId].classList.remove('red')
        }
        n = r + 1 - i;
        bars[n].classList.add('red')
        if (n < pos && getValue(n) > getValue(pos)) {
          box.insertBefore(bars[n], bars[pos].nextElementSibling);
          prevId = pos--;
          // Not i-- because the bar at the current position is changed, so needs
          // to be checked again
          if (i) {myLoop(i)} else {bars[prevId].classList.remove('red'); loopDone = true};
        } else if (n > pos && getValue(n) < getValue(pos)) {
          box.insertBefore(bars[n], bars[pos]);
          prevId = pos++;
          // i-- since even though it is replaced, the new bar has already been checked
          if (--i) {myLoop(i)} else {bars[prevId].classList.remove('red'); loopDone = true};
        } else {
          prevId = n;
          if (--i) {myLoop(i)} else {bars[prevId].classList.remove('red'); loopDone = true};
        };
      }, 100/length)
    })(r-l+1);
    var checkInner = function(){
      if (loopDone) {
        bars[pos].classList.add('done')
        bars[pos].classList.remove('green')
        quicksort(l, pos-1, length);

        // Wait until left hand side is done before doing rhs
        var checkOuter = function(){
          if (outerLoopDone) {
            quicksort(pos+1, r, length)
          }
          else {
            setTimeout(checkOuter, 100/length);
          }
        }

        checkOuter()
      }
      else {
        setTimeout(checkInner, 100/length); // check again in a second
      }
    }

    checkInner()
  }

}


function runQuicksort() {
  // if (noOverride()) {
  outerLoopDone = false
  genRandomBars(barNumber);
  quicksort(0, document.getElementsByClassName("bar").length-1, barNumber);
  // }
}
