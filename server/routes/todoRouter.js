const express = require('express');
const router = express.Router();
const { auth, db } = require('../db');

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

module.exports = { routes: router };
