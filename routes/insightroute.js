let express = require('express');
let router = express.Router();
let Item = require('../models/itemModel');
let expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator/check');

//GET ROUTES
router.get('/console', (req,res) => {
    if (err) {
        console.log(err);
    } else {
        res.render('insights.pug');
    }
});


module.exports = router;