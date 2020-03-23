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

router.get("/:id/actions", validateId(projectDb), (req, res) => {
	const { id } = req.params;

	projectDb
		.getProjectActions(id)
		.then(actions => {
			actions.length
				? res.status(200).json(actions)
				: res
						.status(404)
						.json({ message: "No actions found for this project" });
		})
		.catch(error =>
			res.status(500).json({
				message: "Error retrieving the actions for this project",
				error
			})
		);
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

router.delete("/:id", validateId(projectDb), (req, res) => {
	const { id } = req.params;

	projectDb
		.remove(id)
		.then(deleted => {
			deleted ? res.status(200).end() : null;
		})
		.catch(error => {
			res.status(500).json({
				message: "Error removing the project from the database",
				error
			});
		});
});

module.exports = router;
