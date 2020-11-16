function runCountingsort(){
  var countingLength = barNumber
  var box = document.getElementById("container");
  var bars = document.getElementsByClassName("bar");
  genRandomBars(countingLength);

  queuePositions = [];
  for (i=0;i<countingLength;i++) {
    queuePositions.push(0)
  }
  toggleGreen(countingLength-1)

  function countingSort(i) {
    setTimeout(function() {
      var val = getValue(countingLength-1);
      var pos = queuePositions[val-1];

      toggleGreen(countingLength-1)
      toggleDone(countingLength-1)
      box.insertBefore(bars[countingLength-1], bars[pos]);
      toggleGreen(countingLength-1)

      for (j=val;j<countingLength;j++) {
        queuePositions[j] += 1;
      }

      if (--i) {countingSort(i)} else {toggleGreen(countingLength-1)};

    }, delay)
  }
  countingSort(countingLength)
}
