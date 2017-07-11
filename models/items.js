const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require("bluebird")
const nodeEnv = process.env.NODE_ENV || "test";

const itemSchema = new Schema({
  status: String,
  data: [
    {
      id: {type: Number , required:true , unique: true},
      description: String,
      cost: Number,
      quantity: Number,
      money_given:Number,
      money_required:Number
    }
  ]
});
const items = mongoose.model("items", itemSchema);

module.exports = items;
