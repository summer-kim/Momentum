import { getFolder } from './getTodo.js';

export const onClickGetTodo = async (e) => {
  const selectedBefore = document.querySelector('.selected');
  if (selectedBefore) {
    selectedBefore.classList.remove('selected');
  }
  e.target.classList.add('selected');
  const Name = e.target.innerText;

  const isLink = e.target.classList.contains('link');
  const todos = await getFolder(Name, isLink);

  const todoList = document.querySelector('.todoList');
  //initialize todo List
  while (todoList.firstChild) {
    todoList.firstChild.remove();
  }
  todos.forEach((todo) => displayTodo(todo, todoList));
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

const deleteTodo = (e) => {
  console.log(e.target);
};
