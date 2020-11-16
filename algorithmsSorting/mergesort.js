var mergeCheck = true
var mergeStack = []
var delay = 10

function merge([l1,mid,r2]) {
  console.log('merge', [l1,mid,r2])
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
  console.log(l,r,mergeStack)
  stackComplete = false
  if (r-l>1) {
    mergeStack.push([l, Math.ceil((l+r)/2), r])
    genMergeStack(Math.ceil((l+r)/2), r)
    genMergeStack(l, Math.ceil((l+r)/2))
  }
}


function runMergesort() {
  if (noOverride()) {
    var mergeLength = barNumber
    genRandomBars(mergeLength);
    console.log('YO')
    genMergeStack(0, mergeLength);
    console.log(mergeStack)
    function mergesort() {
      if (mergeStack.length > 0) {
        // merge top of stack after delay
        var check = function(){
          console.log('check')
          if (mergeCheck) {
            merge(mergeStack[mergeStack.length - 1])
            mergesort()
          } else {
            setTimeout(check, delay)
          }
        }
        check()
      }
      else {
        (function myLoop(i) {
          setTimeout(function() {
            currentBar = document.getElementsByClassName("bar")[mergeLength - i]
            currentBar.classList.add('done')
            if (--i) {myLoop(i)};
          }, delay)
        })(mergeLength);
      }
    }
    mergesort()
  }
}
