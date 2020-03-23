const express = require("express");

const actionDb = require("../../data/helpers/actionModel");
const { validateId, validateAction } = require("../middleware/middleware");

const router = express.Router();

// Endpoints
router.get("/", (req, res) => {
	actionDb.get().then(actions => {
		res.status(200).json(actions);
	});
});

router.get("/:id", validateId(actionDb), (req, res) => {
	res.status(200).json(req.item);
});

router.post("/", validateAction, (req, res) => {
	action = req.body;

	actionDb
		.insert(action)
		.then(newAction => {
			res.status(201).json(newAction);
		})
		.catch(error => {
			res
				.status(500)
				.json({ message: "Error adding action to the database", error });
		});
});
module.exports = router;
