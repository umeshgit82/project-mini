const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/loginreg");

//check database connected or not
connect.then(() => {
    console.log("database connected succesfully");
})
.catch(() => {
    console.log("database conncet be connected");
})

const vendorSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  mobile: String,
  type: String,
  shop: { type: String, default: '' },
  password: String
});

//collection part
const collection = new mongoose.model("users", vendorSchema);

module.exports = collection;

