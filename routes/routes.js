const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const items = require('../models/items');
const Schema = mongoose.Schema;
mongoose.Promise = require("bluebird")
const nodeEnv = process.env.NODE_ENV || "test";
if (require.main === module) {
mongoose.connect(config.mongoURL);
}
// const config = require("../config")[process.env.NODE_ENV || 'test'];
// mongoose.connect(config.mongoURL);


const change = function (req, res, next) {
  itemSchema.virtual("change").get(function () {
    if (this.money_given >= this.money_required) {
  return (this.money_given) - (this.money_required);
}
});
}



router.get("/api/customer/items", function (req, res) {
  items.find({}).then(function (items) {
      if (items) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(items);
      }else {
        res.send("no items found")
      }
    })
});

router.post("/api/customer/items/:itemId/purchases", function (req, res) {
  let item = {
    status: "success",
    data: [
      {
        money_given:req.body.money_given,
      }
    ]
  };
  items.update({id: req.params.itemId}, item).then(function (item) {
    if (item) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json(item);
  }else {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(403).json({error: "invalid item"});
  }
  })

});


router.get("/api/vendor/purchases", change , function (req, res) {
  items.find

});

router.get("/api/vendor/money", function (req, res) {

});

router.post("/api/vendor/items", function (req, res) {

});

router.put("/api/vendor/items/:itemId", function (req, res) {

});

module.exports = router;
