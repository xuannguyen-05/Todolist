const express = require('express');
const router = express.Router();

const {register, login} = require('../controllers/user.controller')

router.post("/register", register)

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", login)

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/v3");
  });
});

module.exports = router;