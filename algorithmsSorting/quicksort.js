function pick_pivot(l, r) {
  //return l;
  // return r - 2;
  return Math.floor((l+r)/2);
  // return Math.floor(Math.random() * (r-l) + l);
}

var outerLoopDone = false

function quicksort(l,r) {
  outerLoopDone = false
  var bars = document.getElementsByClassName("bar");
  if (l>=r) {
    bars[l].classList.add('done')
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
      }, 10)
    })(r-l+1);
    var checkInner = function(){
      if (loopDone) {
        bars[pos].classList.add('done')
        quicksort(l, pos-1);

        // Wait until left hand side is done before doing rhs
        var checkOuter = function(){
          if (outerLoopDone) {
            quicksort(pos+1, r)
          }
          else {
            setTimeout(checkOuter, 10);
          }
        }

        checkOuter()
      }
      else {
        setTimeout(checkInner, 10); // check again in a second
      }
    }

    checkInner()
  }

}


function runQuicksort() {
  quicksort(0, document.getElementsByClassName("bar").length-1)
}

// initBars([3,7,4,4,7,5,2,6,7,1,3,5,9,4,6,2,2,5,9,7,3,0,3])
// initBars([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
// runQuicksort()
