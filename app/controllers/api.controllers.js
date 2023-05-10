const { getEndpoints } = require("../models/api.models");

exports.getApi = (req, res, next) => {
	getEndpoints()
		.then((endpoints) => {
			res.status(200).send({ endpoints });
		})
		.catch((err) => {
			if (err) next(err);
		});
};
