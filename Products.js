const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  productname: String,
  quantity: String,
  price: String,
  sales: String,
  prodimage: String
})

const ProdModel = mongoose.model("cs1Prod", UserSchema)

module.exports = ProdModel