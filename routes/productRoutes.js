const express = require("express");
const {
  getProducts,
  getProduct,
  getAllProductCategories,
  getProductCategory,
} = require("../controllers/productController");
const router = express.Router();

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.get("/", use(getProducts));
router.get("/:id", use(getProduct));
router.get("/categories", use(getAllProductCategories));
router.get("/category/:category", use(getProductCategory));

module.exports = router;
