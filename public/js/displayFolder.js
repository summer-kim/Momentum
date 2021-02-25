import { setFolder, getInitialData } from './getTodo.js';
import { onClickGetTodo } from './displayTodos.js';

//Ingredient for make new Folder element or Link element
const addBtnIcon = '<i class="fas fa-plus emoji-plus "></i>';
const makeElement = (isLink, value) => {
  const element = isLink ? 'a' : 'div';
  const className = isLink ? 'link' : 'folder';

  const newElement = document.createElement(element);
  newElement.classList.add(className);
  newElement.innerHTML = value;

  newElement.addEventListener(
    'click',
    value === addBtnIcon ? formDisplay : onClickGetTodo
  );
  return newElement;
};
const targetIsLink = (target) => target.classList.contains('link');

//parent node of Folders and Links
const linkParents = document.querySelector('.links');
const folderParents = document.querySelector('.folders');

const init = async () => {
  //button to spread Folders and Links
  const spreadButtons = document.querySelectorAll('.spreadButton');
  spreadButtons.forEach((btn) => btn.addEventListener('click', spreadFolder));

  const data = await getInitialData();
  const FolderList = Object.keys(data.folders).concat([addBtnIcon]);
  const LinkList = Object.keys(data.links).concat([addBtnIcon]);

  const appendElement = (arr, isLink) => {
    arr.forEach((value) => {
      const element = makeElement(isLink ? true : false, value);
      element.classList.add('FadeInOut');
      isLink ? linkParents.append(element) : folderParents.append(element);
    });
  };
  appendElement(LinkList, true);
  appendElement(FolderList, false);
};

//Interaction when User click "My Folders" or "My Links"
const spreadFolder = (e) => {
  const className = targetIsLink(e.currentTarget) ? 'link' : 'folder';

  const elements = document.querySelectorAll('.' + className);
  const lists = Array.from(elements).slice(1); //except first Div = buttons to toggle
  lists.forEach((element) => element.classList.toggle('FadeInOut'));
};

//when User click create Folder or create Link button
const formDisplay = (e) => {
  const button = e.currentTarget;
  button.removeEventListener('click', formDisplay);

  //switch button to form
  button.innerHTML = `          
     <form class="place-form">
        <input class="Input" type="text" placeholder="Enter the Name" name="folder" required=""/>
        <button type="submit">Submit</button>
      </form>
    `;
  button.addEventListener('submit', onSubmitFolder);
};

const onSubmitFolder = async (e) => {
  e.preventDefault();
  const button = e.currentTarget;
  let input = button.querySelector('.Input').value;

  //send data to different Router depends on Links or Folders
  const isLink = targetIsLink(button);
  await setFolder(input, isLink);

  const parent = isLink ? linkParents : folderParents;

  parent.lastElementChild.remove(); //delete current button
  parent.append(makeElement(isLink, input)); //new Div(input)
  parent.append(makeElement(isLink, addBtnIcon)); //new Div(new button )
};

window.addEventListener('DOMContentLoaded', init);
