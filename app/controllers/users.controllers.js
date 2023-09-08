const {
	selectUsers,
	selectUsersByUsername,
	insertUser,
} = require("../models/users.models");

exports.getUsers = (req, res, next) => {
	selectUsers()
		.then((users) => {
			res.status(200).send({ users });
		})
		.catch(next);
};

exports.getUsersByUsername = (req, res, next) => {
	selectUsersByUsername(req.params.username, req.body.password)
		.then((user) => {
			res.status(200).send({ user });
		})
		.catch(next);
};

exports.postUser = (req, res, next) => {
	insertUser(req.body).then((user) => {
		res.status(201).send({ user });
	}).catch(next)
};
