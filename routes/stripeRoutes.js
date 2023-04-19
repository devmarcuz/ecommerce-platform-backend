const express = require("express");
const { authenticateJwt } = require("../middlewares/authenticator");
const {
  stripePayment,
  confirmPayment,
} = require("../controllers/stripeController");
require("dotenv").config();

const router = express.Router();

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post("/payment", authenticateJwt, use(stripePayment));
router.post("/confirm-payment", authenticateJwt, use(confirmPayment));

module.exports = router;
