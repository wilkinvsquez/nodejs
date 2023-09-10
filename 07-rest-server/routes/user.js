const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
	res.json({
		ok: true,
		message: "get API",
	});
});
router.put("/", (req, res) => {
	res.json({
		ok: true,
		message: "put API",
	});
});
router.post("/", (req, res) => {
	res.json({
		ok: true,
		message: "post API",
	});
});
router.delete("/", (req, res) => {
	res.json({
		ok: true,
		message: "delete API",
	});
});
router.patch("/", (req, res) => {
	res.json({
		ok: true,
		message: "patch API",
	});
});
