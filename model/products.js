const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: "String",
      required: true,
      trim: true,
    },
    description: {
      type: "String",
      required: true,
    },
    price: {
      type: "Number",
      required: true,
    },
    category: {
      type: String,
      ref: "category",
    },
    quantity: {
      type: "Number",
      required: true,
    },
    images: {
      type: String,
    },
    rating: [
      {
        star: Number,
        postedBy: {
          type: ObjectId,
          ref: "userRegister",
        },
        fullname: String,
        review: String,
      },
    ],
  },
  { timestamps: true }
);

const product = mongoose.model("product", productSchema);

module.exports = product;
