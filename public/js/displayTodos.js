import { getFolder, addTodo, deleteFolder } from './getTodo.js';
import { targetIsLink } from './displayFolder.js';

const todoForm = document.querySelector('.todoForm');
const todoTitle = document.querySelector('.todo-title');
const todoList = document.querySelector('.todoList');

const deleteFolderForm = document.querySelector('.deleteFolder');

const newTodo = (todo) => `
        <li>${todo}
            <i class="fas fa-times"></i>
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

  const deletebtn = todoList.lastElementChild.lastElementChild;
  deletebtn.addEventListener('click', deleteTodo);
};

const deleteTodo = async (e) => {
  console.log(e.target);
};

export const onSubmitTodo = (e) => {
  e.preventDefault();
  let input = todoForm.firstElementChild;

  const element = document.querySelector('.selected');
  const Name = element.innerText;
  const isLink = targetIsLink(element);

  addTodo(input.value, Name, isLink);
  displayTodo(input.value);
  input.value = '';
};

const onSubmitDeleteFolder = async (e) => {
  e.preventDefault();
  const folderselected = document.querySelector('.selected');
  const folderName = folderselected.innerHTML;
  const isLink = targetIsLink(folderselected);
  console.log(folderName);
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