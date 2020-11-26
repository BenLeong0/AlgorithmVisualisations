var checkBuild = true

function runHeapsort() {
  var heapLength = barNumber
  var box = document.getElementById("container");
  var bars = document.getElementsByClassName("bar");
  genRandomBars(heapLength);
  var heapSize = 0

  // Build max heap
  // insert at heapsize pos, compare up (unless at root)


  function buildHeap(i) {
    checkBuild = false
    setTimeout(function() {
      bars[heapLength-1].classList.add('green')
      box.insertBefore(bars[heapLength-1], bars[heapLength - i]);

      function compareToParent(pos) {
        //compare to parent, if bigger then swap and repeat
        setTimeout(function() {
          console.log('pos', pos, getValue(pos));
          // Decolourise children
          if (2*pos+1 < heapLength) bars[2*pos+1].classList.remove('red')
          if (2*pos+2 < heapLength) bars[2*pos+2].classList.remove('red')

          if (pos>0) {
            var parentPos = Math.floor((pos-1)/2)
            console.log(pos, parentPos);
            if (getValue(pos) > getValue(parentPos)){
              swapBars(pos, parentPos)
              bars[pos].classList.add('red')
              compareToParent(parentPos)
            } else {
              bars[pos].classList.remove('green')
              checkBuild = true
            }
          } else {
            bars[0].classList.remove('green')
            checkBuild = true
          }
        }, delay)
      }
      console.log(heapLength - i)
      compareToParent(heapLength-i)

    }, delay)

    function checkLoop() {
      if (checkBuild) {
        if (--i) {buildHeap(i)} else {heapsort(heapLength)};
      } else {
        setTimeout(checkLoop,10)
      }
    }
    checkLoop()
  }

  function getLargestChild(pos, sizeOfHeap) {
    if (2*pos+2 < sizeOfHeap) {
      if (getValue(2*pos+1) > = getValue(2*pos+2)) {return 2*pos+1}
      else {return 2*pos+2}
    } else if (2*pos+1 < sizeOfHeap) {
      return 2*pos+1
    } else {
      return false
    }
  }

  function heapsort(sizeOfHeap) {
    bars[pos].classList.add('done')
    box.insertBefore(bars[0], bars[sizeOfHeap])
  }

  buildHeap(heapLength)

  // Extract from heap
}
