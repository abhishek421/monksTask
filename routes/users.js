const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:uid").get((req, res) => {
  User.findOne({ _id: req.params.uid })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete").delete((req, res) => {
  const uid = req.body.uid;
  User.deleteOne({ _id: uid }).then((user) =>
    res.json(`User Deleted`)
  );
});

router.route("/add").post((req, res) => {
  const user = req.body;
  const newUser = new User(user);

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
