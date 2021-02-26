const express = require('express');
const router = express.Router();
const { auth, db, firebase } = require('../db');

//Get initial Data when User Logged in
router.get('/data/get/initData', async (req, res) => {
  const data = { links: {}, folders: {} };
  try {
    const user = auth.currentUser;
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
    res.status(400).send(error.message);
  }
});

//Set a new Folder or Link
router.post('/data/folder/set', async (req, res) => {
  const user = auth.currentUser;
  const { folderName, docName } = req.body;
  try {
    console.log(req.body);
    console.log(folderName, docName);
    await db
      .collection(user.displayName)
      .doc(docName)
      .set({ [folderName]: [] }, { merge: true });
    return res.json({ msg: 'set Link/Folder Successfully' });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Get specific Folder
router.get('/data/folder/get/:folderName/:docName', async (req, res) => {
  try {
    const user = auth.currentUser;
    const folderName = req.params.folderName;
    const docName = req.params.docName;

    const doc = await db.collection(user.displayName).doc(docName).get();

    if (doc.exists) {
      const folders = doc.data();
      return res.json(folders[folderName]);
    } else {
      return res.json({ msg: 'No link/folder matched' });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Add todo to specific Folder
router.post('/data/todo/add', async (req, res) => {
  try {
    const user = auth.currentUser;
    const { folderName, todo, docName } = req.body;
    let folder = [];

    const doc = await db.collection(user.displayName).doc(docName).get();
    if (doc.exists) {
      const folders = doc.data();
      folder = folders[folderName];
      folder.push(todo);
    } else {
      return res.json({ msg: 'No Link/Folder matched' });
    }

    await db
      .collection(user.displayName)
      .doc(docName)
      .update({ [folderName]: folder });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//delete Folder or Link
router.get('/data/folder/delete/:folderName/:docName', async (req, res) => {
  try {
    const user = auth.currentUser;
    const folderName = req.params.folderName;
    const docName = req.params.docName;

    await db
      .collection(user.displayName)
      .doc(docName)
      .update({
        [folderName]: firebase.firestore.FieldValue.delete(),
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = { routes: router };
