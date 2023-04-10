const router = require("express").Router();
const userRegister = require("../model/userRegister");

router.put("/addtocart", async (req, res) => {
  const { title, price, images, quantity, userid } = req.body;

  const response = await userRegister.findByIdAndUpdate(userid, {
    $push: {
      cart: {
        title,
        price,
        images,
        quantity,
      },
    },
  });
  res.status(200).json({ response });
});

router.post("/cartproducts", async (req, res) => {
  const { userid } = req.body;
  console.log(userid, 22);

  const response = await userRegister.findById(userid);
  res.status(200).json({ response: response.cart });
});

router.put("/removecartitem", async (req, res) => {
  const { userid, productid } = req.body;

  const response = await userRegister.findByIdAndUpdate(userid, {
    $pull: {
      cart: {
        _id: productid,
      },
    },
  });
  res.status(200).json({ response });
});

module.exports = router;
