// require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
SECRET_KEY = "MYNAMEISYASH";

const router = express.Router();
const User = require("../model/userRegister");

router.get("/", (req, res) => {
  res.send("hello world");
});

// registering of the users

router.post("/signup", async (req, res) => {
  const { fullname, email, phone, password } = req.body;

  if (!fullname || !email || !phone || !password)
    res.status(402).json({ err: " please fill the fields properly" });

  const didEmailExist = await User.findOne({ email });

  if (didEmailExist) res.status(401).json({ err: "email already registered." });

  const response = new User({ fullname, email, phone, password });
  // hashing our password using Schema.pre( save)
  await response.save();

  res.status(201).json({ msg: "Succesfully Registered." });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      res.status(402).json({ err: "pls fill the field properly" });

    const response = await User.findOne({ email });

    if (response) {
      const isMatched = await bcrypt.compare(password, response.password);
      if (isMatched) {
        //   generating token when password is matched

        const { _id, fullname, email } = response;
        const payload = { _id, fullname, email };
        jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" }, (err, token) => {
          if (err) res.status(400).json({ err });
          res
            .status(200)
            .json({ msg: "logged in successfully ", token, payload });
        });
      } else res.status(402).json({ err: "Invalid details" });
    } else res.status(402).json({ err: "Invalid details" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
