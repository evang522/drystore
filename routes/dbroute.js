'use strict';

let express = require('express');
let router = express.Router();
let Item = require('../models/itemModel');
let expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator/check');
const fs = require('fs');

// GET Routes

router.get('/add', (req,res) => {
  if (req.isAuthenticated()) {
    res.render('add_item');
  } else {
    res.render('notauthenticated');
  }
});


router.get('/storeview', (req,res) => {
  if(req.isAuthenticated()) {
    if(req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search),'gi');
      console.log(regex);
      Item.find({$or: [{name: regex}, {manufacturer:regex},{category:regex},{info:regex}]}, (err,items) => {
        if (err) {
          console.log(err);
        } else {
          res.render('storeview', {
            items:items
          });
        }
      });
    } else {
      Item.find((err,items) => {
        if (err) {
          console.log(err);
        } else {
          res.render('storeview', {
            items:items
          });
        }
      });
    }
  } else {
    res.render('notauthenticated');
  }
});


router.get('/view_item/:id', (req,res) => {
  if (req.isAuthenticated()) {
    Item.findById(req.params.id, (err,item)=> {
      res.render('view_item', {
        item:item
      });
    });
  } else {
    res.render('notauthenticated');
  }
});

router.get('/edit_item/:id', (req,res) => {
  if (req.isAuthenticated()) {
    Item.findById({_id:req.params.id}, (err,item) => {
      res.render('edit_item', {
        item:item
      });
    });
  } else {
    res.render('notauthenticated');
  }
});


// POST Routes

router.post('/add', (req,res) => {
  if(req.isAuthenticated()) {
    if (req.user.role === 'Visitor') {
      res.render('visitor.pug');
    } else {
      
      let item = new Item();
      item.name = req.body.name;
      item.storageUnit = req.body.storageUnit;
      item.quantity = req.body.quantity;
      item.manufacturer = req.body.manufacturer;
      item.category = req.body.category;
      item.servings = req.body.servings;
      item.unpreparedserving = req.body.unpreparedserving;
      item.preparedserving = req.body.preparedserving;
      item.expiration = req.body.expiration;
      item.info = req.body.info;
      item.submittedBy = req.body.submittedBy;
      item.editedBy = req.body.editedBy;


      item.save((err) => {
        if (err) {
          console.log(err);
        } else {
          Item.find({}, (err,items) => {
            if (err) {
              console.log(err);
            } else {
              let today = new Date();
              fs.appendFile('./logs/addlogs.txt', `\n Name:  ${item.name} | Manufacturer:  ${item.manufacturer} | Quantity: ${item.quantity} | added ${today} <br>`);
              res.render('storeview', {
                items:items,
                success: 'Item has been added!'
              });
            }
          });
        }
      });
    }
  } else {
    res.render('notauthenticated');
  }
});


router.post('/view_item/del/:id', (req,res) => {
  if (req.isAuthenticated()) {
    if (req.user.role === 'Visitor') {
      res.render('visitor');
    } else {
      Item.findByIdAndRemove({_id:req.params.id}, (err,item) => {
        let today = new Date();
        fs.appendFile('./logs/deletelogs.txt', `\n Name:  ${item.name} | Manufacturer:  ${item.manufacturer} | Quantity: ${item.quantity} | deleted ${today} <br>`);
        if (err) {
          console.log(err);
        } else {
          Item.find({}, (err,items) => {
            if (err) {
              console.log(err);
            } else { 
              res.render('storeview', {
                success:'Item Removed',
                items:items
              });
            }
          }
          );
        }
      });
    }
  } else {
    res.render('notauthenticated');
  }
});
  


router.post('/view_item/confirm/:id', (req,res) => {
  if (req.isAuthenticated()) {
    Item.findById(req.params.id, (err,item)=> {
      res.render('confirmdeleteitem', {
        item:item
      });
    });
  } else {
    res.render('notauthenticated');
  }
});


router.post('/edit_item/:id', (req,res) => {
  if (req.isAuthenticated()) {
    if (req.user.role === 'Visitor') {
      res.render('visitor');
    } else {
      let item = {};
      item.name = req.body.name;
      item.storageUnit = req.body.storageUnit;
      item.quantity = req.body.quantity;
      item.manufacturer = req.body.manufacturer;
      item.category = req.body.category;
      item.servings = req.body.servings;
      item.unpreparedserving = req.body.unpreparedserving;
      item.preparedserving = req.body.preparedserving;
      item.expiration = req.body.expiration;
      item.info = req.body.info;
      item.editedBy = req.body.editedBy;

      let query = {_id:req.params.id};
      Item.update(query,item, (err) => {
        if (err) {
          console.log(err);
        } else {
	    	 Item.find({}, (err,items) => {
            if (err) {
              console.log(err);
            } else { 
              res.render('storeview', {
                success:'Item Updated',
                items:items
              });
            }
          });
        }
      });
    }
  } else {
    res.render('notauthenticated');
  }
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}


module.exports = router;