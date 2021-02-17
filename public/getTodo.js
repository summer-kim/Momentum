const todoForm = document.querySelector('.todoForm');
const todoInput = todoForm.childNodes[1];
const todoList = document.querySelector('.todoList');
let todos = [];

const checkTodo = () => {
  const todosData = localStorage.getItem('todos');

  if (todosData) {
    [...todos] = JSON.parse(todosData);
    todos.forEach((todo) => displayTodo(todo));
  } else {
    todos = [];
  }
};

const displayTodo = (todo) => {
  const li = document.createElement('li');
  li.innerText = todo;
  const deletebtn = document.createElement('i');
  deletebtn.classList.add('fas');
  deletebtn.classList.add('fa-times');
  li.append(deletebtn);
  todoList.append(li);

  deletebtn.addEventListener('click', deleteTodo);
};

const deleteTodo = (e) => {
  const target_li = e.target.parentNode;
  todos = todos.filter((todo) => todo !== target_li.innerText);
  //localStorage.removeItem(todos);
  localStorage.setItem('todos', JSON.stringify(todos));
  todoList.removeChild(target_li);
};

const putTodo = (e) => {
  e.preventDefault();
  const userName = localStorage.getItem('userName');
  if (!userName) {
    todoInput.value = '';
    return alert('Please Enter Name first');
  } else if (todos.length == 5) {
    todoInput.value = '';
    return alert('maximum number of Todos is 5');
  }
  displayTodo(todoInput.value);

  //localStorage
  todos.push(todoInput.value);
  localStorage.setItem('todos', JSON.stringify(todos));
  todoInput.value = '';
};

checkTodo();
todoForm.addEventListener('submit', putTodo);

export default checkTodo;
