import { getFolder } from './getTodo.js';

const todoForm = document.querySelector('.todoForm');
const todoTitle = document.querySelector('.todo-title');

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

  const todoList = document.querySelector('.todoList');
  //initialize todo List
  while (todoList.firstChild) {
    todoList.firstChild.remove();
  }
  if (todos.length > 0) {
    todos.forEach((todo) => displayTodo(todo, todoList));
  }
};

export const displayTodo = (todo, todoList) => {
  const newTodo = `
        <li>${todo}
            <i class="fas fa-times"></i>
        </li>
    `;
  todoList.insertAdjacentHTML('beforeend', newTodo);

  const deletebtn = todoList.lastElementChild.lastElementChild;
  deletebtn.addEventListener('click', deleteTodo);
};

const deleteTodo = async (e) => {
  console.log(e.target);
};

export const addTodo = (e) => {
  e.preventDefault();
  const value = todoForm.firstElementChild.value;
  console.log(value);
};

todoForm.addEventListener('submit', addTodo);
