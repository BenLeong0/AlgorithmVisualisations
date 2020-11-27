function importGrid() {
  var id = Math.floor(Math.random() * 6913752 + 1);
  var url = "http://www.menneske.no/sudoku/utskrift.html?number=" + id;
  var frame = document.getElementById('randomPuzzle');
  frame.src = url;
  console.log(frame.contentDocument.getElementsByClassName('grid'));
  // var frameDocument = frame.contentDocument || frame.contentWindow.document;
  var frameDocument = frame.contentDocument;
  if (!frameDocument) {
    throw "iframe couldn't be found in DOM.";
  }
  console.log(frameDocument);
}

// HTML IFRAME

"https://www.menneske.no/sudoku/utskrift.html?number=6913752"
