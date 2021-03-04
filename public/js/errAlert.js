export const errAlert = (msg, time) => {
  const errMsg = document.createElement('div');
  errMsg.classList.add('err');
  errMsg.innerText = msg;
  document.body.insertAdjacentElement('beforebegin', errMsg);

  setTimeout(() => {
    errMsg.style.transform = 'translateY(-70px)';
    errMsg.remove();
  }, time);
};
