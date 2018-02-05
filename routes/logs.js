'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/add', (req,res) => {
  const addLogs = fs.readFile('../logs/addlogs.txt', 'utf8');
  console.log(addLogs);
});


module.exports = router;