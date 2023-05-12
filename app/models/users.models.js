const db = require("../../db/connection");

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
			console.log(response);
			if (response.rows.length === 0) {
				return Promise.reject({
					status: 404,
					msg: "sorry, username not found!",
				});
			}
			return response.rows[0];
		});
};
