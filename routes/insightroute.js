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


router.get('/categorylist', (req,res) => {
    if(req.query.search) {
        console.log(req.query.search);
       const regex = new RegExp(escapeRegex(req.query.search),'gi');
       console.log(regex);
     Item.find({category: regex}, (err,items) => {
         if (err) {
             console.log(err);
         } else {
             res.render('categorylist', {
                 items:items
             });
         }
     }) 
    } else {
        res.render('error');
        }
    });

     function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

module.exports = router;