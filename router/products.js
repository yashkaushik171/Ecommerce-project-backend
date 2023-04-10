const express = require("express");
const products = require("../model/products");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploads = multer({ storage });

router.post("/createproducts", uploads.single("images"), async (req, res) => {
  const { title, description, price, category, quantity } = req.body;
  const images = req.file.path;

  if (!title || !description || !price || !category || !quantity || !images)
    res.status(400).json({ err: "pls fill the fields properly" });

  const response = new products({
    title,
    description,
    price,
    category,
    quantity,
    images,
  });
  await response.save();
  res.status(201).json({ response });
});

router.post("/filterproducts", async (req, res) => {
  const { min, max } = req?.body;
  const response = await products.find({ price: { $gt: min, $lt: max + 1 } });
  console.log(response);
  res.status(200).json({ response });
});

router.post("/searchfilter", async (req, res) => {
  const { Search } = req?.body;
  const response = await products.find({ title: { $regex: `${Search}` } });
  console.log(response);
  res.status(200).json({ response });
});

router.post("/allreviews", async (req, res) => {
  const { _id } = req?.body;
  const response = await products.findById(_id);
  res.status(200).json({ response: response.rating });
});

router.get("/shop", async (req, res) => {
  const response = await products.find();
  console.log(response);
  res.status(200).json({ response });
});
router.get("/grocery", async (req, res) => {
  const response = await products.find({ category: "groceries" });
  console.log(response);
  res.status(200).json({ response });
});
router.get("/juice", async (req, res) => {
  const response = await products.find({ category: "juice" });
  console.log(response);
  res.status(200).json({ response });
});

router.get("/singleproducts/:id", async (req, res) => {
  const { id } = req.params;
  const response = await products.findById(id);
  console.log(response);
  res.status(200).json({ response });
});

router.put("/ratingproduct", async (req, res) => {
  const { star, review, postedBy, fullname, id } = req.body;
  if (!star) res.status(400).json({ err: "pls give the start rating " });
  if (!review) res.status(401).json({ err: "review not given " });

  const response = await products.findByIdAndUpdate(id, {
    $push: {
      rating: {
        star,
        review,
        fullname,
        postedBy,
      },
    },
  });
  res.status(200).json({ response });
});

module.exports = router;
