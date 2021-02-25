import { setFolder, getInitialData } from './getTodo.js';
import { onClickGetTodo } from './displayTodos.js';

//Ingredient for make new Folder element or Link element
const addBtnIcon = '<i class="fas fa-plus emoji-plus "></i>';
const makeElement = (isLink, isAddBtn, value) => {
  const element = isLink ? 'a' : 'div';
  const className = isLink ? 'link' : 'folder';

  const newElement = document.createElement(element);
  newElement.classList.add(className);
  newElement.classList.add('FadeInOut');
  newElement.innerHTML = value;

  newElement.addEventListener('click', isAddBtn ? formDisplay : onClickGetTodo);
  return newElement;
};

const init = async () => {
  //button to spread Folders and Links
  const spreadButtons = document.querySelectorAll('.spreadButton');
  spreadButtons.forEach((btn) => btn.addEventListener('click', spreadFolder));

  //parent node of Folders and Links
  const parents = document.querySelectorAll('.parent');
  //parents[0] = link parent Div
  //parents[1] = folder parent Div

  const data = await getInitialData();
  const FolderList = Object.keys(data.folders).concat([addBtnIcon]);
  const LinkList = Object.keys(data.links).concat([addBtnIcon]);

  LinkList.forEach((value, index) => {
    const isAddBtn = index === LinkList.length - 1 ? true : false;
    parents[0].append(makeElement(true, isAddBtn, value));
  });
  FolderList.forEach((value, index) => {
    const isAddBtn = index === FolderList.length - 1 ? true : false;
    parents[1].append(makeElement(false, isAddBtn, value));
  });
};

//Interaction when User click "My Folders" or "My Links"
const spreadFolder = (e) => {
  const childrenDivs = e.currentTarget.parentNode.children;
  const lists = Array.from(childrenDivs).slice(1); //except first Div = buttons to toggle
  lists.forEach((element) => element.classList.toggle('FadeInOut'));
};

//when User click create Folder or create Link button
const formDisplay = (e) => {
  e.currentTarget.parentElement.lastElementChild.removeEventListener(
    'click',
    formDisplay
  );
  e.currentTarget.innerHTML = `
     <form class="place-form">
        <input class="Input" type="text" placeholder="Enter the Name" name="folder" required=""/>
        <button type="submit">Submit</button>
      </form>
    `;
  e.currentTarget.addEventListener('submit', onSubmitFolder);
};

const onSubmitFolder = async (e) => {
  e.preventDefault();
  let input = e.currentTarget.querySelector('.Input').value;

  //send data to different Router depends on Links or Folders
  const isLink = e.currentTarget.classList.contains('link');
  await setFolder(input, isLink);

  const parent = e.target.parentElement.parentElement;

  parent.lastElementChild.remove(); //delete submit form
  parent.append(makeElement(isLink, false, input)); //new Div(input)
  parent.append(makeElement(isLink, true, addBtnIcon)); //new Div(button for submit new input)
};

window.addEventListener('DOMContentLoaded', init);
