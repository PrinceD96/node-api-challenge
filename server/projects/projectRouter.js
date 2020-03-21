const express = require("express");

const projectDb = require("../../data/helpers/projectModel");
const { validateId } = require("../middleware/middleware");

const router = express.Router();

// Endpoints

router.get("/:id", validateId(projectDb), (req, res) => {
	res.status(200).json(req.item);
});

module.exports = router;
