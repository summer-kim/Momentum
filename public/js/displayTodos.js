import { getFolder, addTodo } from './getTodo.js';

const todoForm = document.querySelector('.todoForm');
const todoTitle = document.querySelector('.todo-title');
const todoList = document.querySelector('.todoList');

const newTodo = (todo) => `
        <li>${todo}
            <i class="fas fa-times"></i>
        </li>
    `;

export const onClickGetTodo = async (e) => {
  const selectedBefore = document.querySelector('.selected');
  if (selectedBefore) {
    selectedBefore.classList.remove('selected');
  }
  e.target.classList.add('selected');
  todoForm.classList.remove('dp-none');
  const Name = e.target.innerText;

  todoTitle.innerText = Name;

  const isLink = e.target.classList.contains('link');
  const todos = await getFolder(Name, isLink);

  //initialize todo List
  while (todoList.firstChild) {
    todoList.firstChild.remove();
  }
  if (todos.length > 0) {
    todos.forEach((todo) => displayTodo(todo, todoList));
  }
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
  const folderName = document.querySelector('.selected').innerText;

  addTodo(input.value, folderName);
  displayTodo(input.value);
  input.value = '';
};

todoForm.addEventListener('submit', onSubmitTodo);
