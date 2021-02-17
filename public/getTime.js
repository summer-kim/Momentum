const clock = document.querySelector('.clock').childNodes[1];

const getTime = () => {
  const time = new Date();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  clock.innerText = `${hour < 10 ? '0' + hour : hour}:${
    minute < 10 ? '0' + minute : minute
  }:${second < 10 ? '0' + second : second}`;
};

setInterval(getTime, 1000);
