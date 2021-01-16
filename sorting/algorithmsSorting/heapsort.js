function runHeapsort() {
  var heapLength = barNumber;
  var box = document.getElementById("container");
  var bars = document.getElementsByClassName("bar");
  genRandomBars(heapLength);
  var heapSize = 0;

  function buildHeap() {
    box.insertBefore(bars[bars.length-1], bars[heapSize]);
    bars[heapSize].classList.add('green');
    if (heapSize == 0) {
      setTimeout(function(){
        bars[heapSize].classList.remove('green');
        if (++heapSize < heapLength) {
          buildHeap();
        } else {
          checkHeap()
          heapSort(0);
        }
      }, delay);
    } else {
      setTimeout(function(){compareToParent(heapSize)}, delay);
    }
  }

  function compareToParent(pos) {
    var parentPos = Math.floor((pos-1)/2)
    if (getValue(parentPos) >= getValue(pos)) {
      bars[parentPos].classList.add('green');
      bars[pos].classList.remove('green');
      bars[pos].classList.add('red');

      setTimeout(function(){
        bars[parentPos].classList.remove('green');
        bars[pos].classList.remove('red');
        if (++heapSize < heapLength) {     // might be <=
          buildHeap();
        } else {
          checkHeap()
          heapSort(0);
        }
      }, delay);

    } else {
      bars[parentPos].classList.add('red');
      swapBars(pos, parentPos);

      setTimeout(function(){
        bars[pos].classList.remove('red');
        if (parentPos == 0) {
          bars[parentPos].classList.remove('green');
          if (++heapSize < heapLength) {     // might be <=
            buildHeap();
          } else {
            checkHeap()
            heapSort(0);
          }
        } else {
          compareToParent(parentPos);
        }
      }, delay);
    }

  }


  function heapSort(count) {
    count++
    bars[0].classList.add('done');
    if (count == heapLength) {return};
    setTimeout(function(){
      swapBars(0, heapLength-count);
      getLargestChild(0, count);
    }, delay);
  }


  function getLargestChild(pos, currentCount) {
    if (2*pos+2 < heapLength - currentCount) {
      if (getValue(2*pos+2) >= getValue(2*pos+1)) {
        if (getValue(pos) > getValue(2*pos+2)) {
          heapSort(currentCount)
        } else {
          bars[2*pos+2].classList.add('green')
          bars[pos].classList.add('red')
          setTimeout(function(){
            swapBars(pos, 2*pos+2)
            setTimeout(function(){
              bars[pos].classList.remove('green')
              bars[2*pos+2].classList.remove('red')
              getLargestChild(2*pos+2, currentCount)
            }, delay/2)
          }, delay/2)
        }
      } else {
        if (getValue(pos) > getValue(2*pos+1)) {
          heapSort(currentCount)
        } else {
          bars[2*pos+1].classList.add('green')
          bars[pos].classList.add('red')
          setTimeout(function(){
            swapBars(pos, 2*pos+1)
            setTimeout(function(){
              bars[pos].classList.remove('green')
              bars[2*pos+1].classList.remove('red')
              getLargestChild(2*pos+1, currentCount)
            }, delay/2)
          }, delay/2)
        }
      }
    } else if (2*pos+1 < heapLength - currentCount) {
      if (getValue(pos) > getValue(2*pos+1)) {
        heapSort(currentCount)
      } else {
        bars[2*pos+1].classList.add('green')
        bars[pos].classList.add('red')
        setTimeout(function(){
          swapBars(pos, 2*pos+1)
          setTimeout(function(){
            bars[pos].classList.remove('green')
            bars[2*pos+1].classList.remove('red')
            getLargestChild(2*pos+1, currentCount)
          }, delay/2)
        }, delay/2)
      }
    } else {
      heapSort(currentCount);
    }
  }

  buildHeap();
}


function checkHeap() {
  var bars = document.getElementsByClassName("bar");
  for (let i=0;i<bars.length;i++) {
    if (2*i+2 < bars.length) {
      if (getValue(i) < getValue(2*i+1) || getValue(i) < getValue(2*i+2)) {
        console.log('yuk');
      }
    } else if (2*i+1 < bars.length) {
      if (getValue(i) < getValue(2*i+1)) {
        console.log('yuk');
      }
    }
  }
}
