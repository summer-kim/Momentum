import checkTodo from './getTodo.js';

const nameForm = document.querySelector('.nameForm');
const nameInput = nameForm.childNodes[1];
const greeting = document.querySelector('.greeting');
const changeBtn = document.querySelector('.btn_user');

const checkUser = () => {
  const currentUser = localStorage.getItem('userName');
  if (!currentUser) {
    nameForm.addEventListener('submit', getName);
  } else {
    displayName(currentUser);
  }
};

const getName = (e) => {
  e.preventDefault();
  const userName = nameInput.value;
  localStorage.setItem('userName', userName);
  displayName(userName);
  nameInput.value = '';
};

const displayName = (name) => {
  nameInput.classList.add('dp-none');
  greeting.classList.remove('dp-none');
  greeting.innerHTML = `Welcome, ${name}`;
};

const changeUser = async () => {
  localStorage.removeItem('userName');
  nameInput.classList.remove('dp-none');
  greeting.classList.add('dp-none');
  checkUser();

  //Delet Todo
  const todoList = document.querySelector('.todoList');
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
  await localStorage.removeItem('todos');
  checkTodo();
};
checkUser();
changeBtn.addEventListener('click', changeUser);
