const { selectCategories } = require("../models/categories.models");

exports.getCategories = (req, res, next) => {
	selectCategories()
		.then((categories) => {
			res.status(200).send({ categories });
		})
		.catch((err) => {
			if (err) next(err);
		});
};
