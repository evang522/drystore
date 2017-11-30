let express = require('express');
let router = express.Router();
let Item = require('../models/itemModel');
let expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator/check');

// GET Routes

router.get('/add', (req,res) => {
    res.render('add_item');
});


router.get('/storeview', (req,res) => {
   if(req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search),'gi');
      console.log(regex);
    Item.find({name: regex}, (err,items) => {
        if (err) {
            console.log(err);
        } else {
            res.render('storeview', {
                items:items
            });
        }
    })
   } else {
    Item.find((err,items) => {
        if (err) {
            console.log(err);
        } else {
            res.render('storeview', {
                items:items
            });
        }
    })
}
});


router.get('/view_item/:id', (req,res) => {
    Item.findById(req.params.id, (err,item)=> {
        res.render('view_item', {
            item:item
        });
    })
});

router.get('/edit_item/:id', (req,res) => {
    Item.findById({_id:req.params.id}, (err,item) => {
        res.render('edit_item', {
            item:item
        })
    })
});



// Insights Page
router.get('/insights', (req,res) => {
    Item.find({}, (err,items) => {
        if (err) {
            console.log(err);
        } else { 
            res.render('insights');
        }
    })
});




// POST Routes

router.post('/add', (req,res) => {
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
            res.redirect('storeview');
        }
    })
});


router.post('/view_item/del/:id', (req,res) => {
    Item.findByIdAndRemove({_id:req.params.id}, (err) => {
        if (err) {
            console.log(err);
        } else {
            Item.find({}, (err,items) => {
                if (err) {
                    console.log(err)
                } else { 
                    res.render('storeview', {
                    success:'Item Removed',
                    items:items
                    });
                }
            }
        )
        }
    })
});
  


router.post('/view_item/confirm/:id', (req,res) => {
    Item.findById(req.params.id, (err,item)=> {
        res.render('confirm.pug', {
            item:item
        });
    })
});


router.post('/edit_item/:id', (req,res) => {
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
			console.log(err)
		} else {
			 Item.find({}, (err,items) => {
                if (err) {
                    console.log(err)
                } else { 
                    res.render('storeview', {
                    success:'Item Updated',
                    items:items
                    });
                }
            })
		}
	})
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;