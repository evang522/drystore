const express = require('express');
const Item = require('../models/itemModel');
const InsightProcessor = require('../js/InsightProcessor');

class RestRouteHandler {
    constructor() {
        this.router = express.Router();
    }
    
    static getRouter() {
        const self = new this();
        self.router.get('/items', self.getAllItems.bind(this));
        return self.router;
    }

    async getAllItems(req, res, next) {
        try {
            if (!req.isAuthenticated()) {
                throw new Error('Not Authenticated');
            }
            const itemList = await Item.find({});
            const itemProcessor = new InsightProcessor(itemList);
            console.log(itemProcessor.getTotalCupsAmountForCategory('Breakfast Meat'));
            res.json(itemList);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = RestRouteHandler;
