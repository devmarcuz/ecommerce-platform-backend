const express = require("express");
const {
  createCart,
  getCart,
  updateCart,
  deleteProductCard,
  deleteAllCart,
} = require("../controllers/cartController");
const { authenticateJwt } = require("../middlewares/authenticator");
const router = express.Router();

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post("/create", authenticateJwt, use(createCart));
router.get("/find/:id", authenticateJwt, use(getCart));
router.put("/update/:id", authenticateJwt, use(updateCart));
router.delete("/remove-product/:id", authenticateJwt, use(deleteProductCard));
router.delete("/remove-cart/:id", authenticateJwt, use(deleteAllCart));

module.exports = router;
