const router = require("express").Router();
const userRegister = require("../model/userRegister");
const orders = require("../model/orders");

router.put("/placeorder", async (req, res) => {
  const { userid, address1, address2, city, state, postalcode } = req.body;
  console.log(address1, address2, city, state, postalcode, 6);
  if (!address1 || !address2 || !city || !state || !postalcode)
    res.status(400).json({ err: "pls fill the fields" });
  const response = await userRegister.findByIdAndUpdate(userid, {
    shippingAddress: {
      address1,
      address2,
      city,
      state,
      postalcode,
    },
  });
  res.status(200).json({ response });
});

router.post("/orders", async (req, res) => {
  const { userid } = req.body;
  const userResponse = await userRegister.findById(userid);
  const { fullname, email, phone, shippingAddress, cart } = userResponse;

  const response = new orders({
    orderedBy: userid,
    fullname,
    email,
    phone,
    orderedItems: cart,
    shippingAddress,
  });

  res.status(200).json({ response });
  await response.save();
});

module.exports = router;
