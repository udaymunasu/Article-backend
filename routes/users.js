var express = require("express");
var userModel = require("../models/user");
var router = express.Router();
const bcrypt = require("bcrypt");

function checkEmail(req, res, next) {
  var email = req.body.Email;
  var checkexitemail = userModel.findOne({ email: email });
  checkexitemail.exec((err, data) => {
    if (err) throw err;
    if (data) {
      return res.status(200).json({
        msg: "Email Already Exits",
        results: data,
      });
    }
    next();
  });
}

router.post("/register", async function (req, res, next) {
  let body = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;

  var userDetails = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPass,
  });

  try {
    let users = await userModel.find({ email: body.email });
    if (users.length != 0) {
      res.end(
        JSON.stringify({ status: "failed", data: "Email already exist" })
      );
    }
    userDetails.save().then(
      (result) => {
        res.end(JSON.stringify({ status: "success", data: result }));
      },
      (err) => {
        res.end(JSON.stringify({ status: "failed", data: err }));
      }
    );
  } catch {
    res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));
  }
});

router.post("/login", async function (req, res, next) {

  const { name, password, email } = req.body;

  try {
    const user = await userModel.findOne({ email: email });

    if (user) {
      var validity = await bcrypt.compare(password, user.password);

      if (validity) {
        res.status(200).json({ user , message: "login Succesfull"});

      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
