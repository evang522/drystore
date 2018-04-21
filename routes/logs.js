'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


router.get('/view', (req,res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, '../html/', 'logs.html'));
  } else {
    res.render('notauthenticated');
  }
});
 

router.get('/delete', (req,res) => {
  if (req.isAuthenticated()) {
    const deleteLogs = fs.readFileSync('./logs/deletelogs.txt','utf8');
    res.send(JSON.stringify(deleteLogs));
  } else {
    res.render('notauthenticated');
  }
});


router.get('/add', (req,res) => {
  if (req.isAuthenticated()) {
    const addLogs = fs.readFileSync('./logs/addlogs.txt', 'utf8');
    res.send(JSON.stringify(addLogs));
  } else {
    res.render('notauthenticated');
  }
});



module.exports = router;