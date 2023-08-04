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
	selectUsersByUsername(req.params.username)
		.then((user) => {
			res.status(200).send({ user });
		})
		.catch(next);
};

exports.postUser = (req, res, next) => {
	insertUser(req.body).then((user) => {
		const newUser = { ...user };
		delete newUser.password;
		res.status(201).send({ user: newUser });
	}).catch(next)
};
