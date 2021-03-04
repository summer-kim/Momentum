import { setFolder, getInitialData } from './fetch/getTodo.js';
import { onClickGetTodo } from './displayTodos.js';
import { errAlert } from './errAlert.js';

//Ingredient for make new Folder element or Link element
const addBtnIcon = '<i class="fas fa-plus emoji-plus "></i>';
const makeElement = (isLink, value) => {
  const element = isLink ? 'a' : 'div';
  const className = isLink ? 'link' : 'folder';

  const newElement = document.createElement(element);
  newElement.classList.add(className);
  value === addBtnIcon && newElement.classList.add('form-btn');
  newElement.innerHTML = value;

  newElement.addEventListener(
    'click',
    value === addBtnIcon ? formDisplay : onClickGetTodo
  );
  return newElement;
};
export const targetIsLink = (target) => target.classList.contains('link');

const appendElement = (arr, isLink) => {
  arr.forEach((value) => {
    const element = makeElement(isLink, value);
    element.classList.add('dp-none');
    isLink ? linkParents.append(element) : folderParents.append(element);
  });
};

//parent node of Folders and Links
const linkParents = document.querySelector('.links');
const folderParents = document.querySelector('.folders');
//
//
//function fired when DOMContentLoaded

const init = async () => {
  //button to spread Folders and Links
  const spreadButtons = document.querySelectorAll('.spreadButton');
  spreadButtons.forEach((btn) => btn.addEventListener('click', spreadFolder));

  const data = await getInitialData();
  if (data.errMsg) {
    errAlert(data.errMsg, 3500);
    return;
  }
  const FolderList = Object.keys(data.folders).concat([addBtnIcon]);
  const LinkList = Object.keys(data.links).concat([addBtnIcon]);

  appendElement(LinkList, true);
  appendElement(FolderList, false);
};

//Interaction when User click "My Folders" or "My Links"
const spreadFolder = (e) => {
  const isLink = targetIsLink(e.currentTarget);
  const className = (isLink) => (isLink ? 'link' : 'folder');
  const toggleFolder = (className) => {
    const elements = document.querySelectorAll('.' + className);
    const lists = Array.from(elements).slice(1); //except first Div = buttons to toggle
    lists.forEach((element) => element.classList.toggle('dp-none'));
  };
  toggleFolder(className(isLink));

  //if other unselected folder/link is open, automatically close them
  const unSelected = document.querySelectorAll('.' + className(!isLink))[1];
  if (!unSelected.classList.contains('dp-none')) {
    toggleFolder(className(!isLink));
  }
};

//when User click create Folder or create Link button
const formDisplay = (e) => {
  const button = e.currentTarget;
  const isLink = targetIsLink(button);

  //limit the maximum number of folder/link
  const numberOfFolder = document.querySelector(
    `.${isLink ? 'links' : 'folders'}`
  ).childElementCount;

  if (numberOfFolder >= 7) {
    errAlert('Maximum Number of Folder/Link is 5', 3500);
    return;
  }

  button.removeEventListener('click', formDisplay);

  //switch button to form
  button.innerHTML = `          
     <form class="place-form folder-btn">
        <input class="Input" type="text" placeholder="Enter the Name" name="folder" required=""/>
        <button type="submit">Submit</button>
      </form>
    `;
  button.addEventListener('submit', onSubmitFolder);

  //if User click outside of Form, close Form
  setTimeout(() => {
    document.addEventListener('click', detectClickForm);
  }, 100);
};

const onSubmitFolder = async (e) => {
  e.preventDefault();
  const button = e.currentTarget;
  let input = button.querySelector('.Input').value;

  //send data to different Router depends on Links or Folders
  const isLink = targetIsLink(button);
  const data = await setFolder(input, isLink);
  if (data.errMsg) {
    errAlert(data.errMsg, 3500);
    return;
  }

  const parent = isLink ? linkParents : folderParents;

  parent.lastElementChild.remove(); //delete current button
  parent.append(makeElement(isLink, input)); //new Div(input)
  parent.append(makeElement(isLink, addBtnIcon)); //new Div(new button )

  document.removeEventListener('click', detectClickForm);
};

const closeForm = (formDiv) => {
  formDiv.innerHTML = addBtnIcon;
  formDiv.addEventListener('click', formDisplay);
  document.removeEventListener('click', detectClickForm);
};

const detectClickForm = (e) => {
  const form = document.querySelector('.folder-btn');
  if (!form) {
    return;
  }
  const formDiv = form.parentElement;
  !formDiv.contains(e.target) && closeForm(formDiv);
};

window.addEventListener('DOMContentLoaded', init);
