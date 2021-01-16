function runRadixsort() {
  var radixLength = barNumber
  var box = document.getElementById("container");
  var bars = document.getElementsByClassName("bar");
  genRandomBars(radixLength);

  var d = Math.floor(Math.log10(radixLength))+1
  var n = 1

  function radixsort() {
    queuePositions = [0,0,0,0,0,0,0,0,0,0];
    var i = 0
    function sortBar(i) {
      bars[i].classList.add('green')
      var digit = getValue(i).toString().padStart(d, '0')[d-n]
      var pos = queuePositions[digit]
      box.insertBefore(bars[i], bars[pos]);
      for (let j=digit;j<10;j++) {
        queuePositions[j]++
      }

      setTimeout(function(){
        bars[pos].classList.remove('green')
        if (++i < radixLength) {
            sortBar(i)
        } else if (n++ < d) {
          radixsort()
        } else {
          function setAllDone(j) {
            setTimeout(function() {
              currentBar = document.getElementsByClassName("bar")[radixLength - j]
              currentBar.classList.add('done')
              if (--j) {setAllDone(j)};
            }, delay)
          }

          setAllDone(radixLength)
        }
      }, delay)
    }
    sortBar(0)
  }

  radixsort()

}
