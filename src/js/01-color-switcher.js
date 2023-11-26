const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStart.addEventListener('click', startChangingColor);
btnStop.addEventListener('click', stopChangingColor);

let timer = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function startChangingColor() {
  btnStart.disabled = true;
  btnStop.disabled = false;
  timer = setInterval(changeBackgroundColor, 1000);
}
function stopChangingColor() {
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearInterval(timer);
}

function changeBackgroundColor() {
  document.body.style.background = getRandomHexColor();
}
