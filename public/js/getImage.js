const body = document.querySelector('body');
const imgName = 4;

const applyImg = (num) => {
  const backgroundImg = document.createElement('img');
  backgroundImg.src = `./image/${num}.jpg`;
  backgroundImg.classList.add('bgImage');
  body.append(backgroundImg);
};

applyImg(imgName);
