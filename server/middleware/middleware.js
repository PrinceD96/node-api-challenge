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

const middleware = [logger];

module.exports = { middleware, validateId };
