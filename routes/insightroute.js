let express = require('express');
let router = express.Router();
let Item = require('../models/itemModel');
let expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator/check');

//GET ROUTES
router.get('/console', (req,res) => {
        Item.find({}, (err,items) => {
            if(err) {
                console.log(err);
            } else {
        res.render('insights', {
            items:items
        });
            }

    })
});

router.get('/breakdown', (req,res) => {
    Item.find({}, (err,items) => {
        if(err) {
            console.log(err);
        } else {
            res.render('insightBreakdown', {
                items:items
            })
        }
    })
});

module.exports = router;