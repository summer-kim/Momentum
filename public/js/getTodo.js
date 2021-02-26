export const getInitialData = async () => {
  const url = `/data/get/initData`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

//make new Folder or Link
export const setFolder = async (Name, isLink) => {
  const url = '/data/folder/set';
  const config = {
    method: 'POST',
    body: JSON.stringify({ folderName: Name, docName: isLink ? true : false }),
    'Content-Type': 'application/json',
  };

  try {
    await fetch(url, config);
  } catch (err) {
    console.log(err);
  }
};

//Get a Folder or Link
export const getFolder = async (folderName, isLink) => {
  const url = `/data/folder/get/${folderName}/${isLink ? 'links' : 'folders'}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

//make new Todo in the Folder or Link
export const addTodo = async (value, Name, isLink) => {
  const url = '/data/todo/add';
  const config = {
    method: 'POST',
    body: JSON.stringify({ todo: value, Name, docName: isLink ? true : false }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await fetch(url, config);
    return;
  } catch (err) {
    console.log(err);
  }
};

//Delete Folder or Link
export const deleteFolder = async (Name, isLink) => {
  const docName = isLink ? 'links' : 'folders';
  const url = `/data/folder/delete/${Name}/${docName}`;

  try {
    await fetch(url);
  } catch (err) {
    console.log(err);
  }
};
