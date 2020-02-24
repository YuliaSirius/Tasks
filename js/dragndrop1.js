'use strict';
let balls = document.querySelectorAll('.ball');
for (let i = balls.length - 1; i >= 0; i--) {
  let element = balls[i];
  element.style.position = 'absolute';
  element.style.left = element.offsetLeft + 'px';
  element.addEventListener('mousedown', mouseDown);
}

let sizeElementLeft;
let sizeElementTop;

function mouseDown(event) {
  let size = getElementPos(event.target);
  sizeElementLeft = event.pageX - size.left;
  sizeElementTop = event.pageY - size.top;
  document.body.append(event.target);
  moveElement(event);

  event.target.ondragstart = function() {
    return false;
  };
}

document.addEventListener('mousemove', MouseMove);

function MouseMove(event) {
  if (event.target.tagName !== 'IMG') return;
  moveElement(event);
}

function moveElement(event) {
  event.target.style.left = event.pageX - sizeElementLeft + 'px';
  event.target.style.top = event.pageY - sizeElementTop + 'px';
}

function getElementPos(elem) {
  let position = elem.getBoundingClientRect();
  return {
    left: position.left,
    top: position.top
  };
}

document.addEventListener('mouseup', mouseUp);

function mouseUp(event) {
  if (event.target.tagName !== 'IMG') return;
}
