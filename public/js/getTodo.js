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
    method: 'POST', // or 'PUT'
    body: JSON.stringify({ folderName: Name, isLink }),
    'Content-Type': 'application/json',
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json();
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
    method: 'POST', // or 'PUT'
    body: JSON.stringify({ todo: value, Name, isLink }),
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
