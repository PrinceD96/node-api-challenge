const express = require("express");

const projectDb = require("../../data/helpers/projectModel");

const router = express.Router();

// Endpoints

router.get("/", (req, res) => {
	projectDb.get().then(projects => {
		res.status(200).json(projects);
	});
});

module.exports = router;
