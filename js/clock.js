'use strict';
let svg = document.getElementById('clock');
let svgWidth = svg.getAttribute('width');
let svgHeight = svg.getAttribute('height');
let svgCenterX = svgWidth / 2;
let svgCenterY = svgHeight / 2;
let clockWidth = svgWidth * 0.75;
let clockHeight = svgHeight * 0.75;

function createSvgClock() {
  let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('stroke', 'rgb(10, 10, 136)');
  circle.setAttribute('stroke-width', '6');
  circle.setAttribute('fill', 'rgba(81, 81, 207, 0.65)');
  circle.setAttribute('r', clockWidth / 2);
  circle.setAttribute('cx', svgCenterX);
  circle.setAttribute('cy', svgCenterY);
  svg.append(circle);
  let txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  txt.setAttribute('x', svgCenterX);
  txt.setAttribute('y', svgHeight * 0.35);
  txt.style.fontSize = '22';
  txt.style.fontWeight = 'bold';
  txt.style.fill = 'rgb(0, 0, 0)';
  txt.id = 'time';
  txt.style.textAnchor = 'middle';
  svg.append(txt);
  let serif = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  serif.setAttribute('x', svgCenterX - 4);
  serif.setAttribute('y', (svgHeight - clockHeight) / 2);
  serif.setAttribute('width', 8);
  serif.setAttribute('height', 20);
  serif.setAttribute('fill', 'rgb(10, 10, 136)');
  serif.id = 'serif';
  svg.append(serif);
  addElement(serif);
  let hour = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  hour.setAttribute('x', svgCenterX - 4);
  hour.setAttribute('y', svgCenterY - (0.75 * clockHeight) / 2);
  hour.style.fill = 'rgb(0, 0, 0)';
  hour.id = 'hour';
  hour.textContent = '1';
  hour.style.fontSize = '24';
  hour.style.fontWeight = 'bold';
  svg.append(hour);
  addElement(hour);
  let arrowHour = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'line'
  );
  arrowHour.setAttribute('x1', svgCenterX);
  arrowHour.setAttribute('y1', svgCenterY);
  arrowHour.setAttribute('x2', svgCenterX);
  arrowHour.setAttribute('y2', 0.4 * clockHeight);
  arrowHour.setAttribute('stroke', 'rgb(0, 0, 0)');
  arrowHour.setAttribute('stroke-width', 7);
  arrowHour.setAttribute('stroke-linecap', 'round');
  arrowHour.setAttribute('id', 'arrowHour');
  svg.append(arrowHour);
  let arrowMin = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  arrowMin.setAttribute('x1', svgCenterX);
  arrowMin.setAttribute('y1', svgCenterY);
  arrowMin.setAttribute('x2', svgCenterX);
  arrowMin.setAttribute('y2', 0.35 * clockHeight);
  arrowMin.setAttribute('stroke', 'rgb(0, 0, 0)');
  arrowMin.setAttribute('stroke-width', 4);
  arrowMin.setAttribute('stroke-linecap', 'round');
  arrowMin.setAttribute('id', 'arrowMin');
  svg.append(arrowMin);
  let arrowSec = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  arrowSec.setAttribute('x1', svgCenterX);
  arrowSec.setAttribute('y1', svgCenterY);
  arrowSec.setAttribute('x2', svgCenterX);
  arrowSec.setAttribute('y2', 0.3 * clockHeight);
  arrowSec.setAttribute('stroke', 'rgb(0, 0, 0)');
  arrowSec.setAttribute('stroke-width', 2);
  arrowSec.setAttribute('stroke-linecap', 'round');
  arrowSec.setAttribute('id', 'arrowSec');
  svg.append(arrowSec);
}

function addElement(elem) {
  for (let i = 30; i < 360; i += 30) {
    let nextElem = elem.cloneNode(true);
    if (elem.id === 'serif') {
      nextElem.setAttribute('transform', `rotate(${i} ${svgCenterX}  ${svgCenterY})`);
    }
    if (elem.id === 'hour') {
      let radians = (i * Math.PI) / 180;
      let radiusForNumber = 0.4 * clockWidth;
      let textCenterX = svgWidth / 2 + radiusForNumber * Math.sin(radians);
      let textCenterY = svgHeight / 2 - radiusForNumber * Math.cos(radians);
      nextElem.setAttribute('x', textCenterX - 6);
      nextElem.setAttribute('y', textCenterY + 8);
      elem.textContent++;
    }
    svg.append(nextElem);
  }
}

createSvgClock();

window.addEventListener('load', getStartedWatch());
function getStartedWatch() {
  setInterval(updateTime, 0);
}
function updateTime() {
  let now = new Date();
  updateClockTime(now);
  updateTextTime(now);
}
function updateClockTime(now) {
  let arrowHour = document.querySelector('#arrowHour');
  let arrowMin = document.querySelector('#arrowMin');
  let arrowSec = document.querySelector('#arrowSec');
  let angleSec = now.getSeconds() * 6;
  let angleMin = now.getMinutes() * 6;
  let angleHour =
    (now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600) * 30;
  arrowSec.setAttribute('transform', `rotate(${angleSec} ${svgCenterX} ${svgCenterY})`);
  arrowMin.setAttribute('transform', `rotate(${angleMin} ${svgCenterX} ${svgCenterY})`);
  arrowHour.setAttribute('transform', `rotate(${angleHour} ${svgCenterX} ${svgCenterY})`);
}
function updateTextTime(now) {
  let text = document.querySelector('#time');
  text.textContent = formatDateTime(now);
}
function formatDateTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let content =
    addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds);
  return content;
}
function addZero(val) {
  var strVal = val.toString();
  while (strVal.length < 2) strVal = '0' + strVal;
  return strVal;
}
