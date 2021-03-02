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

//ADD new Todo or DELETE Todo
export const fetchTodo = async ({
  method,
  todo,
  folderName,
  isLink = false,
}) => {
  const url = `/data/todo/${method}`;
  const docName = isLink ? 'links' : 'folders';
  const config = {
    method: 'PUT',
    body: JSON.stringify({ todo, folderName, docName }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

//Delete Folder or Link
export const deleteFolder = async (folderName, isLink) => {
  const docName = isLink ? 'links' : 'folders';
  const url = `/data/folder/delete/${folderName}/${docName}`;

  try {
    const res = await fetch(url);
    const data = res.json(res);
    return data;
  } catch (err) {
    console.log(err);
  }
};
