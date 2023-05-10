const db = require("../../db/connection");

exports.selectReviewsById = (id) => {
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
				return Promise.reject({ status: 404, msg: "not found!" });
			} else return result.rows;
		});
};
