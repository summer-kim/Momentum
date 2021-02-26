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
export const setFolder = async (folderName, isLink) => {
  const url = '/data/folder/set';
  const docName = isLink ? 'links' : 'folders';
  const config = {
    method: 'POST',
    body: JSON.stringify({ folderName, docName }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

//Get a Folder or Link
export const getFolder = async (folderName, isLink) => {
  const docName = isLink ? 'links' : 'folders';
  const url = `/data/folder/get/${folderName}/${docName}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

//make new Todo in the Folder or Link
export const addTodo = async (value, folderName, isLink) => {
  const url = '/data/todo/add';
  const docName = isLink ? 'links' : 'folders';
  console.log(folderName, docName);

  const config = {
    method: 'POST',
    body: JSON.stringify({ todo: value, folderName, docName }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json();
    console.log(data);
    return;
  } catch (err) {
    console.log(err);
  }
};

//Delete Folder or Link
export const deleteFolder = async (folderName, isLink) => {
  const docName = isLink ? 'links' : 'folders';
  const url = `/data/folder/delete/${folderName}/${docName}`;

  try {
    await fetch(url);
  } catch (err) {
    console.log(err);
  }
};
