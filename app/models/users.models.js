const { password } = require("pg/lib/defaults");
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
exports.selectUsersByUsername = ( username, password ) => {
	return checkUsernameExists(username).then(()=>{

		return db
			.query(
				`
		SELECT * FROM users
		WHERE username = $1
		`,
				[username]
			)
	}).then((result) => {
		const user = result.rows[0]
		const hashedPassword = user.password
		delete user.password
		return bcrypt.compare(password, hashedPassword).then((isPasswordMatch) => {
			if (isPasswordMatch) {
			  return user;
			} else {
			  return Promise.reject({
				status: 401,
				msg: "Invalid password!",
			  });
			}
		  });
		})
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
