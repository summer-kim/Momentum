const express = require('express');
const router = express.Router();
const { auth, db } = require('../db');

//Set new Folder
router.get('/data/folder/:folderName', async (req, res) => {
  try {
    const user = auth.currentUser;
    const folderName = req.params.folderName;

    await db
      .collection(user.displayName)
      .doc('folders')
      .set({ [folderName]: [] }, { merge: true });
    return res.json({ msg: 'set Folder Successfully' });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Set new Link
router.get('/data/link/:linkName', async (req, res) => {
  try {
    const user = auth.currentUser;
    const linkName = req.params.linkName;

    await db
      .collection(user.displayName)
      .doc('links')
      .set({ [linkName]: [] }, { merge: true });
    return res.json({ msg: 'set Link Successfully' });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

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

//Get specific Folder
router.get('/data/get/folder/:folderName', async (req, res) => {
  try {
    const user = auth.currentUser;
    const folderName = req.params.folderName;

    const doc = await db.collection(user.displayName).doc('folders').get();

    if (doc.exists) {
      const folders = doc.data();
      return res.json(folders[folderName]);
    } else {
      return res.json({ msg: 'No folder matched' });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Get specific Link
router.get('/data/get/link/:linkName', async (req, res) => {
  try {
    const user = auth.currentUser;
    const linkName = req.params.linkName;

    const doc = await db.collection(user.displayName).doc('links').get();

    if (doc.exists) {
      const links = doc.data();
      return res.json(links[linkName]);
    } else {
      return res.json({ msg: 'No folder matched' });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Add todo to specific Folder
router.post('/data/add', async (req, res) => {
  try {
    const user = auth.currentUser;
    const { Name, todo, isLink } = req.body;
    let folder = [];

    const link_or_folder = isLink ? 'links' : 'folders';

    const doc = await db.collection(user.displayName).doc(link_or_folder).get();
    if (doc.exists) {
      const folders = doc.data();
      folder = folders[Name];
      folder.push(todo);
    } else {
      return res.json({ msg: 'No Link/Folder matched' });
    }

    await db
      .collection(user.displayName)
      .doc(link_or_folder)
      .update({ [Name]: folder });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = { routes: router };
