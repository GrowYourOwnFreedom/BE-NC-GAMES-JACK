const db = require("../db/connection");
exports.checkReview_idExists = (id) => {
	return db
		.query(
			`
    SELECT * FROM reviews
    WHERE review_id = $1;
    `,
			[id]
		)
		.then((result) => {
			if (result.rows.length === 0) {
				return Promise.reject({
					status: 404,
					msg: "sorry, review_id not found!",
				});
			}
		});
};

exports.checkUsernameExists = (username) => {
	return db
		.query(
			`
    SELECT * FROM users
    WHERE username = $1;
    `,
			[username]
		)
		.then((result) => {
			if (result.rows.length === 0) {
				return Promise.reject({
					status: 404,
					msg: "sorry, username not found!",
				});
			}
		});
};
