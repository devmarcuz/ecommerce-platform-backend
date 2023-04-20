const express = require("express");
const {
  addUser,
  loginUser,
  getUsers,
  updateUser,
  getUser,
} = require("../controllers/userController");
const {
  addUserValidator,
  validatorResults,
  loginUserValidator,
  updateUserValidator,
} = require("../middlewares/userValidation");
const { authenticateJwt } = require("../middlewares/authenticator");
const router = express.Router();

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post("/add-user", addUserValidator, validatorResults, use(addUser));
router.post(
  "/login-user",
  loginUserValidator,
  validatorResults,
  use(loginUser)
);
router.get("/", authenticateJwt, use(getUsers));
router.get("/user/:id", authenticateJwt, use(getUser));
router.put(
  "/update-user/:id",
  authenticateJwt,
  updateUserValidator,
  validatorResults,
  use(updateUser)
);

module.exports = router;
