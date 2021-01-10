
function box(i,j) {
  return $('#' + i.toString() + '_' + j.toString())
}

function boxDiv(i,j) {
  return '<div class="box" id="' + i.toString() + '_' + j.toString() + '"></div>'
}

function isVisited(i,j) {
  return box(i,j)[0].classList.contains('visited') || box(i,j)[0].classList.contains('wall')
}

function markPath(i,j) {
  if (i == startNode[0] && j == startNode[1]) {return}
  box(i,j).addClass('path')

  if (box(i,j).hasClass('u')) {
    markPath(i-1,j)
  } else if (box(i,j).hasClass('d')) {
    markPath(i+1,j)
  } else if (box(i,j).hasClass('l')) {
    markPath(i,j-1)
  } else if (box(i,j).hasClass('r')) {
    markPath(i,j+1)
  }
}

function disableSliders() {
  $('#widthSlider').css('pointer-events','none')
  $('#heightSlider').css('pointer-events','none')
}

function enableSliders() {
  $('#widthSlider').css('pointer-events','all')
  $('#heightSlider').css('pointer-events','all')
}
