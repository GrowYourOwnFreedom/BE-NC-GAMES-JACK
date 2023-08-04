const db = require("../../db/connection");
const { checkUsernameExists, checkUsernameDoesentExist } = require("../utils");
const bcrypt = require("bcrypt");

exports.selectUsers = () => {
	return db
		.query(
			`
    SELECT * FROM users;
    `
		)
		.then((result) => {
			return result.rows;
		});
};
exports.selectUsersByUsername = (username) => {
	return db
		.query(
			`
	SELECT * FROM users
	WHERE username = $1
	`,
			[username]
		)
		.then((response) => {
			if (response.rows.length === 0) {
				return Promise.reject({
					status: 404,
					msg: "sorry, username not found!",
				});
			}
			return response.rows[0];
		});
};

exports.insertUser = async (user) => {
	const { username, password, name, avatar_url } = user;
	return checkUsernameDoesentExist(username)
		.then(() => {
			return bcrypt.hash(password, 10);
		})
		.then((hashedPassword) => {
			return db.query(
				`
			INSERT INTO users
			(username, password, name, avatar_url )
			VALUES ($1, $2, $3, $4) RETURNING *
			`,
				[username, hashedPassword, name, avatar_url]
			);
		})
		.then((result) => {
			return result.rows[0];
		});
};
