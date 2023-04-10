const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const ObjectId = mongoose.Schema.Types.ObjectId;

// Declare the Schema of the Mongo model
var userRegisterSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isLogin: {
      type: Boolean,
      default: false,
    },
    shippingAddress: {
      address1: String,
      address2: String,
      city: String,
      state: String,
      postalcode: Number,
    },
    cart: [
      {
        title: String,
        price: Number,
        images: String,
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

// here we are hashing our password

userRegisterSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

//Export the model
module.exports = mongoose.model("User", userRegisterSchema);
