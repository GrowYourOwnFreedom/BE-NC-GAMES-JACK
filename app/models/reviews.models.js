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
				return Promise.reject({
					status: 404,
					msg: "sorry, review_id not found!",
				});
			} else return result.rows[0];
		});
};

exports.selectReviews = () => {
	return db
		.query(
			`
	SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, COUNT(comments.comment_id) comment_count
  FROM reviews
  LEFT JOIN comments ON comments.review_id = reviews.review_id
  GROUP BY reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer
  ORDER BY created_at DESC;
	`
		)
		.then((response) => {
			return response.rows;
		});
};

exports.updateReviewVotes = (id, body) => {
	return db
		.query(
			`
	UPDATE reviews
	SET votes = votes + $1
	WHERE review_id = $2
	RETURNING * ;
	`,
			[body.inc_votes, id]
		)
		.then((result) => {
			return result.rows[0];
		});
};
