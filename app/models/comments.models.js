const db = require("../../db/connection");

const { checkReview_idExists, checkComment_idExists } = require("../utils");

const { checkReview_idExists, checkUsernameExists } = require("../utils");

exports.selectCommentsByReview_id = (id) => {
	return checkReview_idExists(id)
		.then(() => {
			return db.query(
				`
    SELECT * FROM comments
    WHERE review_id = $1
    ORDER BY created_at DESC;
    `,
				[id]
			);
		})
		.then((result) => {
			return result.rows;
		});
};


exports.deleteCommentByComment_id = (id) => {
	return checkComment_idExists(id).then(() => {
		return db.query(
			`DELETE  FROM comments
		WHERE comment_id = $1;`,
			[id]
		);
	});

exports.insertCommentByReview_id = (id, comment) => {
	const { username, body } = comment;
	if (typeof body !== "string" || typeof username !== "string") {
		return Promise.reject({
			status: 400,
			msg: "sorry, comment should be in the form of an obj with a username and a body property, both of which should be strings",
		});
	}
	return checkUsernameExists(username)
		.then(() => {
			return checkReview_idExists(id);
		})
		.then(() => {
			return db.query(
				`
	INSERT INTO comments
	(review_id, author, body)
	VALUES ($1, $2, $3) RETURNING *;
	`,
				[id, username, body]
			);
		})
		.then((result) => {
			return result.rows[0];
		});

};
