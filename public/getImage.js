const body = document.querySelector('body');
const numOfImg = 4;

const applyImg = (num) => {
  const backgroundImg = document.createElement('img');
  backgroundImg.src = `image/${num + 1}.jpg`;
  backgroundImg.classList.add('bgImage');
  body.append(backgroundImg);
};
function init() {
  const num = Math.floor(Math.random() * numOfImg);
  applyImg(num);
}
init();
