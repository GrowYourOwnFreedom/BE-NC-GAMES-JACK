const db = require("../../db/connection");
const { checkReview_idExists, checkComment_idExists } = require("../utils");
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
};
