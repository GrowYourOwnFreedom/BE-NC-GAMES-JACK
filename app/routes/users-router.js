const {
	getUsers,
	getUsersByUsername,
} = require("../controllers/users.controllers");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers);

usersRouter.get("/:username", getUsersByUsername);

module.exports = usersRouter;
