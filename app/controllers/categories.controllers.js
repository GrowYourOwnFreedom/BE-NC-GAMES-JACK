const {
	selectCategories,
	addCategory,
} = require("../models/categories.models");

exports.getCategories = (req, res, next) => {
	selectCategories()
		.then((categories) => {
			res.status(200).send({ categories });
		})
		.catch(next);
};

exports.postCategory = (req, res, next) => {
	addCategory(req.body)
		.then((category) => {
			console.log(category);
			res.status(201).send({ category });
		})
		.catch((err) => {
			next(err);
		});
};
