import { getFolder, fetchTodo, deleteFolder } from './fetch/getTodo.js';
import { targetIsLink } from './displayFolder.js';
import { errAlert } from './errAlert.js';

const todoForm = document.querySelector('.todoForm');
const todoTitle = document.querySelector('.todo-title');
const todoList = document.querySelector('.todoList');

const deleteFolderForm = document.querySelector('.deleteFolder');

const newTodo = (todo, isLink) =>
  `<li>${todo}
      ${!isLink ? `${'<i class="fas fa-check check"></i>'}` : ''}
      <i class="fas fa-times delete"></i>
    </li>`;

export const onClickGetTodo = async (e) => {
  const folder = e.target;
  const selectedBefore = document.querySelector('.selected');
  if (selectedBefore) {
    selectedBefore.classList.remove('selected');
  }
  folder.classList.add('selected');
  todoForm.classList.remove('dp-none');

  const isLink = targetIsLink(folder);
  const folderName = folder.innerText;
  todoTitle.innerText = folderName;

  try {
    const todos = await getFolder(folderName, isLink);
    if (todos.errMsg) {
      errAlert(todos.errMsg, 3500);
      return;
    }
    //initialize todo List
    while (todoList.firstChild) {
      todoList.firstChild.remove();
    }
    if (todos && todos.length > 0) {
      todos.forEach((todo) => displayTodo(todo, isLink));
    }

    deleteFolderForm.classList.remove('dp-none');
    const deleteButton = deleteFolderForm.firstElementChild;
    const icon = isLink
      ? "<i class='fas fa-link'></i>"
      : "<i class='far fa-folder-open'></i>";
    deleteButton.innerHTML = `DELETE ${folderName} ${icon} `;
  } catch (err) {
    console.log.g(err);
  }
};

const displayTodo = (todo, isLink) => {
  const todoText = isLink ? todo : todo.txt;
  todoList.insertAdjacentHTML('beforeend', newTodo(todoText, isLink));

  const deletebtn = todoList.lastElementChild.querySelector('.delete');
  deletebtn.addEventListener('click', onClickDeleteTodo);
  if (!isLink) {
    const checkbtn = todoList.lastElementChild.querySelector('.check');
    checkbtn.addEventListener('click', onClickCheckTodo);
    if (todo.check) {
      checkbtn.classList.add('checked');
      checkbtn.parentElement.classList.add('txt-check');
    }
  }
};

const onClickDeleteTodo = async (e) => {
  const element = document.querySelector('.selected');

  const folderName = element.innerText;
  const isLink = targetIsLink(element);
  const todo = e.target.parentElement;
  try {
    const data = await fetchTodo({
      method: 'delete',
      todo: todo.innerText,
      folderName,
      isLink,
    });
    if (data.errMsg) {
      errAlert(data.errMsg, 3500);
      return;
    }
    todo.remove();
  } catch (err) {
    console.log(err);
  }
};

const onClickCheckTodo = async (e) => {
  const todo = e.target.parentElement;
  const element = document.querySelector('.selected');
  const folderName = element.innerText;
  try {
    const data = await fetchTodo({
      method: 'change',
      todo: todo.innerText,
      folderName,
    });
    if (data.errMsg) {
      errAlert(data.errMsg, 3500);
      return;
    }

    todo.classList.toggle('txt-check');
    e.target.classList.toggle('checked');
  } catch (err) {
    console.log(err);
  }
};

const onSubmitTodo = (e) => {
  e.preventDefault();
  let input = todoForm.firstElementChild;

  const element = document.querySelector('.selected');
  const folderName = element.innerText;
  const isLink = targetIsLink(element);

  fetchTodo({ method: 'add', todo: input.value, folderName, isLink });

  const todo = {
    txt: input.value,
  };
  displayTodo(isLink ? input.value : todo, isLink);
  input.value = '';
};

const onSubmitDeleteFolder = async (e) => {
  e.preventDefault();
  const folderselected = document.querySelector('.selected');
  const folderName = folderselected.innerHTML;
  const isLink = targetIsLink(folderselected);

  try {
    const data = await deleteFolder(folderName, isLink);
    if (data.errMsg) {
      errAlert(data.errMsg, 3500);
      return;
    }

    while (todoList.firstChild) {
      todoList.firstChild.remove();
    }
    folderselected.remove();
    todoTitle.innerText = 'Click your Menu!';
    deleteFolderForm.classList.add('dp-none');
    todoForm.classList.add('dp-none');
  } catch (err) {
    console.log(err);
  }
};
deleteFolderForm.addEventListener('submit', onSubmitDeleteFolder);
todoForm.addEventListener('submit', onSubmitTodo);
