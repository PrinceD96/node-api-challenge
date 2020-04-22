const logger = (req, res, next) => {
	console.log(
		`\n*** Server Logger ***\n 
    Request Method: ${req.method}
    Request URL: ${req.originalUrl}
    TimeStamp: ${new Date(Number(new Date()))}`
	);
	next();
};

const validateId = db => (req, res, next) => {
	const { id } = req.params;

	db.get(id)
		.then(item => {
			item !== null
				? (req.item = item)
				: res.status(400).json({ message: "Invalid id" });
			next();
		})
		.catch(error => {
			res.status(500).json({ message: "Could not validate", error });
		});
};

const validateProject = (req, res, next) => {
	const { body } = req;

	JSON.stringify(body) === "{}"
		? res.status(400).json({ message: "missing project data" })
		: !body.name || !body.description
		? res.status(400).json({
				message: `missing required ${
					!body.name ? "name" : !body.description ? "description" : null
				} field`
		  })
		: next();
};

const validateAction = (req, res, next) => {
	const { body } = req;

	JSON.stringify(body) === "{}"
		? res.status(400).json({ message: "missing action data" })
		: !body.project_id
		? res.status(400).json({ message: "missing required project_id field" })
		: !body.description || !body.notes
		? res.status(400).json({
				message: `missing required ${
					!body.description ? "description" : !body.notes ? "notes" : null
				} field`
		  })
		: body.description.length > 128
		? res
				.status(400)
				.json({ message: "description must be 128 characters or fewer" })
		: next();
};

const middleware = [logger];

module.exports = { middleware, validateId, validateProject, validateAction };
