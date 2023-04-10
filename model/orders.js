const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const userRegister = require("../model/userRegister");

const ordersSchema = new mongoose.Schema(
  {
    orderedBy: {
      type: ObjectId,
      ref: userRegister,
    },
    fullname: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    orderedItems: Array,
    shippingAddress: Array,
    paymentMethod: {
      type: String,
      default: "cash on delivery",
    },
  },
  { timestamps: true }
);

const orders = mongoose.model("order", ordersSchema);

module.exports = orders;
