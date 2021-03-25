const clock = document.querySelector('.clock').childNodes[1];

let innerWidth;
let timerIsOn;
let interval;

const startInterval = () => {
  interval = setInterval(() => getTime(), 1000);
};
const resizing = () => {
  innerWidth = window.innerWidth;
  if (innerWidth < 700 && timerIsOn) {
    clearInterval(interval);
    timerIsOn = false;
  } else if (innerWidth >= 700 && !timerIsOn) {
    startInterval();
    timerIsOn = true;
  }
};
const getTime = () => {
  const time = new Date();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  clock.innerText = `${hour < 10 ? '0' + hour : hour}:${
    minute < 10 ? '0' + minute : minute
  }:${second < 10 ? '0' + second : second}`;
};

window.addEventListener('resize', resizing);
window.addEventListener('DOMContentLoaded', () => {
  innerWidth = window.innerWidth;
  if (innerWidth >= 700) {
    startInterval();
    timerIsOn = true;
  } else {
    timerIsOn = false;
  }
});
