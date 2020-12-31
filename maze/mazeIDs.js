function u(i,j) {
  return i.toString() + '_' + j.toString() + '_u'
}
function d(i,j) {
  return i.toString() + '_' + j.toString() + '_d'
}
function l(i,j) {
  return i.toString() + '_' + j.toString() + '_l'
}
function r(i,j) {
  return i.toString() + '_' + j.toString() + '_r'
}
function box(i,j) {
  return i.toString() + '_' + j.toString()
}

function uDiv(i,j) {
  return '<div class="hori" id="' + u(i,j) + '"></div>'
}
function dDiv(i,j) {
  return '<div class="hori" id="' + d(i,j) + '"></div>'
}
function lDiv(i,j) {
  return '<div class="vert" id="' + l(i,j) + '"></div>'
}
function rDiv(i,j) {
  return '<div class="vert" id="' + r(i,j) + '"></div>'
}
function boxDiv(i,j) {
  return '<div class="box" id="' + box(i,j) + '"></div>'
}

function isVisited(i,j) {
  return $('#' + box(i,j))[0].classList.contains('visited')
}

function updateColours(nodeDetails) {
  i = nodeDetails[0];
  j = nodeDetails[1];
  dir = nodeDetails[2];

  $('#' + box(i,j)).addClass('visited')

  switch (dir) {
    case 'u':
      $('#' + u(i,j)).addClass('visited')
      $('#' + d(i-1,j)).addClass('visited')
      break;
    case 'd':
      $('#' + d(i,j)).addClass('visited')
      $('#' + u(i+1,j)).addClass('visited')
      break;
    case 'l':
      $('#' + l(i,j)).addClass('visited')
      $('#' + r(i,j-1)).addClass('visited')
      break;
    case 'r':
      $('#' + r(i,j)).addClass('visited')
      $('#' + l(i,j+1)).addClass('visited')
  }
}
