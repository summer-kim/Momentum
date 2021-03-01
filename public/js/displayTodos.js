import { getFolder, fetchTodo, deleteFolder } from './getTodo.js';
import { targetIsLink } from './displayFolder.js';

const todoForm = document.querySelector('.todoForm');
const todoTitle = document.querySelector('.todo-title');
const todoList = document.querySelector('.todoList');

const deleteFolderForm = document.querySelector('.deleteFolder');

const newTodo = (todo) => `
        <li>${todo}
          <i class="fas fa-check check"></i>
          <i class="fas fa-times delete"></i>
        </li>
    `;

export const onClickGetTodo = async (e) => {
  const folder = e.target;
  const selectedBefore = document.querySelector('.selected');
  if (selectedBefore) {
    selectedBefore.classList.remove('selected');
  }
  folder.classList.add('selected');
  todoForm.classList.remove('dp-none');
  const Name = folder.innerText;

  todoTitle.innerText = Name;

  const isLink = targetIsLink(folder);
  const todos = await getFolder(Name, isLink);

  //initialize todo List
  while (todoList.firstChild) {
    todoList.firstChild.remove();
  }
  if (todos && todos.length > 0) {
    todos.forEach((todo) => displayTodo(todo, todoList));
  }

  deleteFolderForm.classList.remove('dp-none');
  const deleteButton = deleteFolderForm.firstElementChild;
  const icon = isLink
    ? "<i class='fas fa-link'></i>"
    : "<i class='far fa-folder-open'></i>";
  deleteButton.innerHTML = `DELETE ${Name} ` + icon;
};

export const displayTodo = (todo) => {
  todoList.insertAdjacentHTML('beforeend', newTodo(todo));

  const deletebtn = todoList.lastElementChild.querySelector('.delete');
  const checkbtn = todoList.lastElementChild.querySelector('.check');

  deletebtn.addEventListener('click', onClickDeleteTodo);
  checkbtn.addEventListener('click', onClickCheckTodo);
};

const onClickDeleteTodo = async (e) => {
  const element = document.querySelector('.selected');

  const folderName = element.innerText;
  const isLink = targetIsLink(element);
  const todo = e.target.parentElement;
  try {
    await fetchTodo({
      method: 'delete',
      todo: todo.innerText,
      folderName,
      isLink,
    });
    todo.remove();
  } catch (err) {
    console.log.g(err);
  }
};

const onClickCheckTodo = (e) => {
  const todo = e.target.parentElement;
  todo.classList.add('txt-check');
  e.target.classList.add('checked');
};

export const onSubmitTodo = (e) => {
  e.preventDefault();
  let input = todoForm.firstElementChild;

  const element = document.querySelector('.selected');
  const folderName = element.innerText;
  const isLink = targetIsLink(element);

  fetchTodo({ method: 'add', todo: input.value, folderName, isLink });
  displayTodo(input.value);
  input.value = '';
};

const onSubmitDeleteFolder = async (e) => {
  e.preventDefault();
  const folderselected = document.querySelector('.selected');
  const folderName = folderselected.innerHTML;
  const isLink = targetIsLink(folderselected);

  try {
    await deleteFolder(folderName, isLink);

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
