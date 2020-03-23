const express = require("express");

const projectDb = require("../../data/helpers/projectModel");
const { validateId, validateProject } = require("../middleware/middleware");

const router = express.Router();

// Endpoints

router.get("/", (req, res) => {
	projectDb.get().then(projects => {
		res.status(200).json(projects);
	});
});

router.get("/:id", validateId(projectDb), (req, res) => {
	res.status(200).json(req.item);
});

router.post("/", validateProject, (req, res) => {
	const project = req.body;

	projectDb
		.insert(project)
		.then(newProject => {
			res.status(201).json(newProject);
		})
		.catch(error =>
			res
				.status(500)
				.json({ message: "Error adding project to the database", error })
		);
});

router.put("/:id", validateProject, validateId(projectDb), (req, res) => {
	const { id } = req.params;
	const updatedProject = { ...req.body };

	projectDb
		.update(id, updatedProject)
		.then(updated => {
			updated
				? res.status(200).json(updated)
				: res
						.status(500)
						.json({ message: "Error retrieving the updated project" });
		})
		.catch(error => {
			res.status(500).json({ message: "Error updating the project", error });
		});
});

module.exports = router;
