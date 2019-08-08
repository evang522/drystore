'use strict';

let express = require('express');
let router = express.Router();
let Item = require('../models/itemModel');
let expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator/check');
let produceCatData = require('../js/insightprocess');
let produceWaterData = require('../js/waterProcess');
let User = require('../models/userModel');

//GET ROUTES
router.get('/console', (req,res) => {
  if (req.isAuthenticated()) {
    Item.find({}, (err,items) => {
      if(err) {
        console.log(err);
      } else {
        let catData = produceCatData(items);
        res.render('insights', {
          items:items,
        });
      }
        
    });
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
          catData:catData,
        });
      }
    });
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
      });
    } else {
      res.render('error');
    }
  } else {
    res.render('notauthenticated');
  }
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}


router.get('/needscalculator', (req,res) => {
  if (req.isAuthenticated()) {
    res.redirect('/insights/needscalculator/' + req.user.id);
  } else {
    res.render('notauthenticated');
  }
});


router.post('/needscalculator/mealprefs/:id', (req,res) => {
  if (req.isAuthenticated()) {
    console.log(req.body);
    let mealprefs = {};
    mealprefs.bmeal1 = req.body.bmeal1;
    mealprefs.bmeal2 = req.body.bmeal2;
    mealprefs.bmeal3 = req.body.bmeal3;
    mealprefs.bmeal4 = req.body.bmeal4;
    mealprefs.bmeal5 = req.body.bmeal5;
    mealprefs.lmeal1 = req.body.lmeal1;
    mealprefs.lmeal2 = req.body.lmeal2;
    mealprefs.lmeal3 = req.body.lmeal3;
    mealprefs.dmeal1 = req.body.dmeal1;
    mealprefs.dmeal2 = req.body.dmeal2;
    mealprefs.dmeal3 = req.body.dmeal3;
    mealprefs.dmeal4 = req.body.dmeal4;
    mealprefs.dmeal5 = req.body.dmeal5;
    User.findByIdAndUpdate({_id:req.params.id}, {$set: {mealprefs:mealprefs}}, (err,usertoUpdate) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/insights/needscalculator');
      }
    });
  } else {
    res.render('notauthenticated');
  }

});

router.get('/needscalculator/:id', (req,res) => {
  if (req.isAuthenticated()) {
    User.findById({_id:req.params.id}, (err,userinfo) => {
      Item.find({}, (err,items) => {
        if (err) {
          console.log(err);
        } else {
          let catData = produceCatData(items);
          let waterData = produceWaterData(items);
          res.render('needcalc', {
            items:items,
            catData:catData,
            waterData:waterData,
            userinfo:userinfo
          });
        }
      });
    });
  } else {
    res.render('notauthenticated');
  }
});

    
module.exports = router;