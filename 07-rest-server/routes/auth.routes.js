const { Router } = require("express");
const { login } = require("../controllers/auth.controller");
const { check } = require("express-validator");
const { fieldValidation } = require("../middlewares/fieldValidation");

const router = Router();

router.post(
	"/login",
	[
		check("email", "The email is required").isEmail(),
		check("password", "The password is required").notEmpty(),
	],
	login,
);

module.exports = router;
