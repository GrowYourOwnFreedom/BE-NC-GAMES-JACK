const {
	getUsers,
	getUsersByUsername,
	postUser,
} = require("../controllers/users.controllers");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers).post(postUser)

usersRouter.get("/:username", getUsersByUsername);

module.exports = usersRouter;
