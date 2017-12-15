let express = require('express');
let router = express.Router();
let Item = require('../models/itemModel');
let expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator/check');
let produceCatData = require('../js/insightprocess');

//GET ROUTES
router.get('/console', (req,res) => {
    if (req.isAuthenticated()) {
        Item.find({}, (err,items) => {
            if(err) {
                console.log(err);
            } else {
        res.render('insights', {
            items:items
        });
            }
        
    })
    } else {
        res.render('notauthenticated');
    }
});

router.get('/breakdown', (req,res) => {
    if (req.isAuthenticated()) {
    Item.find({}, (err,items) => {
        if(err) {
            console.log(err);
        } else {
            let catData = produceCatData(items);
            res.render('insightBreakdown', {
                items:items,
                catData:catData
            })
        }
    })
} else {
    res.render('notauthenticated');
}
});


router.get('/categorylist', (req,res) => {
    if (req.isAuthenticated()) {
    if(req.query.search) {
        console.log(req.query.search);
       const regex = new RegExp(escapeRegex(req.query.search),'gi');
       console.log(regex);
     Item.find({category: regex}, (err,items) => {
         if (err) {
             console.log(err);
         } else {
             res.render('categorylist', {
                 items:items,
                 returnMessage:regex
             });
         }
     }) 
    } else {
        res.render('error');
        }
    } else {
        res.render('notauthenticated');
    }
    });

     function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };


    router.get('/needscalculator', (req,res) => {
            Item.find({}, (err,items) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render('needcalc', {
                        items:items
                    });
                }
            })
    });

module.exports = router;