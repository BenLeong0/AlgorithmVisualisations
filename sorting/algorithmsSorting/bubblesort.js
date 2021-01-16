var bubbleCheck = true
var bubbleQueue = []

function genBubbleQueue(n) {
  bubbleQueue = []
  for (let i=0; i<n-1; i++) {
    for (let j=0; j<n-i-1; j++) bubbleQueue.push(j)
    bubbleQueue.push([n-i-1])
  }
  bubbleQueue.push([0])
}



function runBubblesort(){
  var bubbleLength = barNumber
  var box = document.getElementById("container");
  var bars = document.getElementsByClassName("bar");
  genRandomBars(bubbleLength);
  genBubbleQueue(bubbleLength);

  function bubbleSort(i) {
    setTimeout(function() {

      currentBubble = bubbleQueue.shift()
      if (Number(currentBubble)>0){
        bars[Number(currentBubble)].classList.remove('green')
        bars[Number(currentBubble)].classList.remove('red')
        bars[Number(currentBubble)-1].classList.remove('green')
        bars[Number(currentBubble)-1].classList.remove('red')
      }

      if (typeof(currentBubble) == "number") {
        // compare, swap
        if (getValue(currentBubble) > getValue(currentBubble+1)) {
          // swap
          bars[currentBubble].classList.add('green')
          bars[currentBubble+1].classList.add('red')
          swapBars(currentBubble, currentBubble+1)
        } else {
          // don't swap
          bars[currentBubble].classList.add('red')
          bars[currentBubble+1].classList.add('green')
        }

      } else {
        // mark done
        bars[Number(currentBubble)].classList.add('done')
      }

      if (--i) {bubbleSort(i)};

    }, delay)
  }

  bubbleSort(bubbleQueue.length)
}
