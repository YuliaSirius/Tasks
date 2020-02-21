'use strict';
let bolls = document.querySelectorAll('.boll');
bolls.forEach(element => {
  element.addEventListener('mousedown', function() {
    let sizeX = event.pageX - getElementPos(element).left;
    let sizeY = event.pageY - getElementPos(element).top;
    element.classList.add('position');
    document.body.append(element);
    moveElement(event.pageX, event.pageY);

    function moveElement(pageX, pageY) {
      element.style.left = pageX - sizeX + 'px';
      element.style.top = pageY - sizeY + 'px';
    }
    function onMouseMove(event) {
      moveElement(event.pageX, event.pageY);
      element.style.cursor = 'pointer';
    }

    element.addEventListener('mousemove', onMouseMove);

    element.addEventListener('mouseup', function() {
      element.removeEventListener('mousemove', onMouseMove);
      event.preventDefault;
    });
  });
  element.ondragstart = function() {
    return false;
  };
});

function getElementPos(elem) {
  let position = elem.getBoundingClientRect();
  return {
    left: position.left,
    top: position.top
  };
}
