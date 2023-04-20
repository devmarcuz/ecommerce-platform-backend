const express = require("express");
const { authenticateJwt } = require("../middlewares/authenticator");
const { createOrder, getUserOrder } = require("../controllers/orderController");
const router = express.Router();

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post("/create", authenticateJwt, use(createOrder));
router.get("/find/:id", authenticateJwt, use(getUserOrder));

module.exports = router;
