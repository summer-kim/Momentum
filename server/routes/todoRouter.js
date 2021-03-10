const express = require('express');
const router = express.Router();
const { auth, db, firebase } = require('../db');

//Get initial Data when User Logged in
router.get('/get/initData', async (req, res) => {
  const data = { links: {}, folders: {} };
  const user = auth.currentUser;

  try {
    const docs = await db.collection(user.displayName).get();

    docs.forEach((doc) => {
      switch (doc.id) {
        case 'links':
          data.links = doc.data();
          break;
        case 'folders':
          data.folders = doc.data();
          break;
        default:
          break;
      }
    });
    return res.json(data);
  } catch (error) {
    res.status(400).json({ errMsg: error.message });
  }
});

//Set a new Folder or Link
router.post('/folder/set', async (req, res) => {
  const user = auth.currentUser;
  const { folderName, docName } = req.body;

  try {
    await db
      .collection(user.displayName)
      .doc(docName)
      .set({ [folderName]: [] }, { merge: true });

    return res.json({ msg: 'set Link/Folder Successfully' });
  } catch (error) {
    res.status(400).json({ errMsg: error.message });
  }
});

//Get specific Folder
router.get('/folder/get/:folderName/:docName', async (req, res) => {
  const user = auth.currentUser;
  const folderName = req.params.folderName;
  const docName = req.params.docName;

  try {
    const doc = await db.collection(user.displayName).doc(docName).get();

    if (doc.exists) {
      const folders = doc.data();
      return res.json(folders[folderName]);
    } else {
      return res.json({ msg: 'No link/folder matched' });
    }
  } catch (error) {
    res.status(400).json({ errMsg: error.message });
  }
});

//Add todo to specific Folder
router.put('/todo/add', async (req, res) => {
  const user = auth.currentUser;
  const { folderName, todo, docName } = req.body;
  let folder = [];

  try {
    const doc = await db.collection(user.displayName).doc(docName).get();

    if (doc.exists) {
      const folders = doc.data();
      folder = folders[folderName];
      docName === 'folders'
        ? folder.push({ txt: todo, check: false })
        : folder.push(todo);
    } else {
      return res.json({ msg: 'No Link/Folder matched' });
    }

    await db
      .collection(user.displayName)
      .doc(docName)
      .update({ [folderName]: folder });
  } catch (error) {
    res.status(400).json({ errMsg: error.message });
  }
});

//delete Folder or Link
router.get('/folder/delete/:folderName/:docName', async (req, res) => {
  const user = auth.currentUser;
  const folderName = req.params.folderName;
  const docName = req.params.docName;

  try {
    await db
      .collection(user.displayName)
      .doc(docName)
      .update({
        [folderName]: firebase.firestore.FieldValue.delete(),
      });
    return res.json({ msg: 'successfully deleted' });
  } catch (error) {
    res.status(400).json({ errMsg: error.message });
  }
});

//delete todo
router.put('/todo/delete', async (req, res) => {
  const user = auth.currentUser;
  const { folderName, docName, todo } = req.body;
  let folder = [];

  try {
    const doc = await db.collection(user.displayName).doc(docName).get();
    if (doc.exists) {
      const folders = doc.data();
      folder = folders[folderName];
      if (docName === 'folders') {
        folder = folder.filter((list) => list.txt !== todo);
      } else {
        const index = folder.indexOf(todo);
        folder.splice(index, 1);
      }
    } else {
      return res.json({ msg: 'No Link/Folder matched' });
    }

    await db
      .collection(user.displayName)
      .doc(docName)
      .update({ [folderName]: folder });
    return res.json({ msg: 'successfully deleted' });
  } catch (error) {
    res.status(400).json({ errMsg: error.message });
  }
});

//change todo
router.put('/todo/change', async (req, res) => {
  const user = auth.currentUser;
  const { folderName, todo } = req.body;
  let folder = [];

  try {
    const doc = await db.collection(user.displayName).doc('folders').get();

    if (doc.exists) {
      const folders = doc.data();
      folder = folders[folderName];
      const index = folder.findIndex((list) => list.txt === todo);
      folder[index].check = !folder[index].check;
    } else {
      return res.json({ msg: 'No Folder matched' });
    }

    await db
      .collection(user.displayName)
      .doc('folders')
      .update({ [folderName]: folder });
    return res.json({ msg: 'successfully changed' });
  } catch (error) {
    res.status(400).json({ errMsg: error.message });
  }
});

module.exports = { routes: router };
