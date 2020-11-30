function runRandomsort() {
  var randomLength = barNumber
  var box = document.getElementById("container");
  var bars = document.getElementsByClassName("bar");
  genRandomBars(randomLength);

  var sorted = []
  for (i=0;i<randomLength;i++) {
    sorted.push(getValue(i))
  }
  sorted.sort()

  function randomSort() {
    var currentOrder = []
    for (i=0;i<randomLength;i++) {
      currentOrder.push(getValue(randomLength-i-1))
      removeBar()
    }

    var newOrder = []
    for (i=0;i<randomLength;i++) {
      index = Math.floor(Math.random() * currentOrder.length)
      newOrder.push(currentOrder.splice(index, 1))
    }

    var allCorrect = true
    for (i=0;i<randomLength;i++) {
      addBar(newOrder[i])
      if (newOrder[i] == sorted[i]) {
        bars[i].classList.add('green')
      } else {
        // bars[i].classList.add('red')
        allCorrect = false
      }
    }

    setTimeout(function() {
      if (allCorrect) {
        for (i=0;i<randomLength;i++) {
          bars[i].classList.add('done')
        }
      } else {
        for (i=0;i<randomLength;i++) {
          bars[i].classList.remove('green')
          bars[i].classList.remove('red')
        }
        randomSort()
      }
    }, delay)
    // shuffle newOrder
    // compare to sorted and colour accordingly
    // delayed: go again if not correct, else colour all done
  }

  randomSort()

}
