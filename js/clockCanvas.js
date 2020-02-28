'use strict';
let cnv = document.getElementById('cnv');
let cnt = cnv.getContext('2d');

const cnvWidth = cnv.width;
const cnvHeight = cnv.height;
const сenterX = cnvWidth / 2;
const сenterY = cnvHeight / 2;
const ratio = 0.75;
const clockWidth = ratio * cnvWidth;
const clockHeight = clockWidth;
const clockRadius = clockWidth / 2;

window.addEventListener('load', createClock);

function createClock() {
  requestAnimationFrame(drawClock);
}

function drawClock() {
  cnt.clearRect(0, 0, cnvWidth, cnvHeight);
  drawCircle();
  drawSerifs();
  drawNumbers();
  drawArrow(70, 7);
  drawArrow(90, 5);
  drawArrow(110, 3);
  drawTextTime();
  requestAnimationFrame(drawClock);
}

function drawCircle() {
  let grad = cnt.createRadialGradient(сenterX, сenterY, 0, сenterX, сenterY, clockRadius);
  grad.addColorStop(0, 'rgb(255, 255, 255)');
  grad.addColorStop(1, 'rgb(198, 92, 224)');
  cnt.fillStyle = grad;
  cnt.beginPath();
  cnt.arc(сenterX, сenterY, clockRadius, 0, Math.PI * 2, false);
  cnt.fill();
  cnt.strokeStyle = 'rgb(119, 10, 146)';
  cnt.lineWidth = 8;
  cnt.stroke();
}
function drawSerifs() {
  cnt.save();
  cnt.fillStyle = 'rgb(119, 10, 146)';
  cnt.translate(сenterX, сenterY);
  for (let i = 0; i < 12; i++) {
    cnt.rotate(-0.523);
    cnt.beginPath();
    cnt.fillRect(clockRadius - 20, -3, 20, 6);
  }
  cnt.restore();
}
function drawNumbers() {
  for (let i = 1; i <= 12; i++) {
    let numberRadius = clockRadius * 0.77;
    let numberX = cnvWidth / 2 + numberRadius * Math.sin(i * 0.523);
    let numberY = cnvHeight / 2 - numberRadius * Math.cos(i * 0.523);
    cnt.font = 'italic bold 24px Arial';
    cnt.textAlign = 'center';
    cnt.textBaseline = 'middle';
    cnt.fillStyle = 'rgb(119, 10, 146)';
    cnt.fillText(`${i}`, numberX, numberY + 2);
  }
}
function drawArrow(length, width) {
  cnt.strokeStyle = 'rgb(119, 10, 146)';
  cnt.lineWidth = width;
  cnt.lineCap = 'round';
  cnt.beginPath();
  cnt.moveTo(сenterX, сenterY);
  let coord = getCoord(length);
  cnt.lineTo(coord.x, coord.y);
  cnt.stroke();
}
function getCoord(length) {
  let angle = getAngle(length);
  let radians = (angle * Math.PI) / 180;
  let coordX = сenterX + length * Math.sin(radians);
  let coordY = сenterY - length * Math.cos(radians);
  return { x: coordX, y: coordY };
}
function getAngle(length) {
  let time = getDate();
    if (length === 70) {
    return (time.hour + time.min / 60 + time.sec / 3600) * 30;
  }
  if (length === 90) {
    return time.min * 6;
  }
  if (length === 110) {
    return time.sec * 6;
  }
}
function drawTextTime() {
  let period = formatDateTime();
  let index = 0.35;
  cnt.font = 'italic bold 24px Arial';
  cnt.textAlign = 'center';
  cnt.textBaseline = 'middle';
  cnt.fillStyle = 'rgb(119, 10, 146)';
  cnt.fillText(`${period}`, сenterX, cnvHeight * index);
}
function formatDateTime() {
  let time = getDate();
  let content = `${addZero(time.hour)}:${addZero(time.min)}:${addZero( time.sec )}`;
  return content;
}
function getDate() {
  let now = new Date();
  return {
    hour: now.getHours(),
    min: now.getMinutes(),
    sec: now.getSeconds()
  };
}
function addZero(val) {
  let elem = val.toString();
  if (elem.length < 2) {
    elem = `0${elem}`
  }
  return elem;
}
