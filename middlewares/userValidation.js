const { check, validationResult } = require("express-validator");

exports.addUserValidator = [
  check("email", "Invalid Email").isEmail().normalizeEmail(),
  check("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }),
];

exports.loginUserValidator = [
  check("email", "Invalid Email").isEmail().normalizeEmail(),
];

exports.updateUserValidator = [
  check("email", "Invalid Email").isEmail().normalizeEmail(),
  check("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }),
];

exports.validatorResults = (req, res, next) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();

  if (hasErrors) {
    const firstError = result.array()[0].msg;
    res.status(400);
    throw new Error(firstError);
  }
  next();
};
