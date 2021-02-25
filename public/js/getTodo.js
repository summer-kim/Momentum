export const setFolder = async (Name, isLink) => {
  const url = `/data/${isLink ? 'link' : 'folder'}/${Name}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getFolder = async (Name, isLink) => {
  const url = `/data/get/${isLink ? 'link' : 'folder'}/${Name}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

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

export const addTodo = async (value, Name, isLink) => {
  const url = '/data/add';
  const config = {
    method: 'POST', // or 'PUT'
    body: JSON.stringify({ todo: value, Name, isLink }), // data can be `string` or {object}!
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
