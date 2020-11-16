function merge([l1,mid,r2]) {
  mergeCheck = false
  var box = document.getElementById("container");
  var bars = document.getElementsByClassName("bar");

  if (mid - l1 == 0 || r2 - mid == 0) {
    // one side is empty
    mergeStack.length = mergeStack.length - 1
    mergeCheck = true
  }
  else if (getValue(l1) <= getValue(mid)) {
    bars[l1].classList.add('green')
    bars[mid].classList.add('red')
    mergeStack[mergeStack.length - 1] = [l1+1,mid,r2]
    // mergeStack.push([l1+1,mid,r2])

    setTimeout(function(){
      bars[l1].classList.remove('green')
      bars[mid].classList.remove('red')
      mergeCheck = true
    }, delay)

  }
  else {
    bars[l1].classList.add('red')
    bars[mid].classList.add('green')
    box.insertBefore(bars[mid], bars[l1])
    mergeStack[mergeStack.length - 1] = [l1+1,mid+1,r2]
    // mergeStack.push([l1+1,mid+1,r2])

    setTimeout(function(){
      bars[l1+1].classList.remove('red')
      bars[l1].classList.remove('green')
      mergeCheck = true
    }, delay)
  }
}


function genMergeStack(l,r) { // r not included, so start as length
  stackComplete = false
  if (r-l>1) {
    mergeStack.push([l, Math.ceil((l+r)/2), r])
    genMergeStack(Math.ceil((l+r)/2), r)
    genMergeStack(l, Math.ceil((l+r)/2))
  }
}


function runMergesort() {
  // if (noOverride()) {
  var mergeLength = barNumber
  mergeCheck = true
  mergeStack = []
  genRandomBars(mergeLength);
  genMergeStack(0, mergeLength);
  function mergesort() {
    if (mergeStack.length > 0) {
      // merge top of stack after delay
      var check = function(){
        if (mergeCheck) {
          merge(mergeStack[mergeStack.length - 1])  // merge top of stack
          mergesort()                               // run again
        } else {
          setTimeout(check, delay)
        }
      }
      check()
    }
    else {
      function setAllDone(i) {
        setTimeout(function() {
          currentBar = document.getElementsByClassName("bar")[mergeLength - i]
          currentBar.classList.add('done')
          if (--i) {setAllDone(i)};
        }, delay)
      }
      setAllDone(mergeLength);
    }
  }
  mergesort()
  // }
}
