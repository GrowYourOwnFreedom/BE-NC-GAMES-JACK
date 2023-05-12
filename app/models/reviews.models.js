const db = require("../../db/connection");
const { checkReview_idExists, checkCoulmnValueInTable } = require("../utils");

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

exports.selectReviews = (category, sort_by = "created_at", order = "DESC") => {
	const validSortQuery = [
		`owner`,
		`title`,
		`review_id`,
		"category",
		"review_img_url",
		"created_at",
		"votes",
		"designer",
		"comment_count",
	];
	if (!validSortQuery.includes(sort_by)) {
		return Promise.reject({
			status: 400,
			msg: "sorry, invalid sort query!",
		});
	}
	if (order !== "ASC" && order !== "DESC") {
		return Promise.reject({
			status: 400,
			msg: "sorry, invalid order query!",
		});
	}

	let queryStr = `SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, COUNT(comments.comment_id) comment_count
	FROM reviews
	LEFT JOIN comments ON comments.review_id = reviews.review_id`;

	const queryValues = [];

	if (category) {
		queryStr += ` WHERE category = $1`;
		queryValues.push(category);
	}

	queryStr += ` GROUP BY reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer
	ORDER BY ${sort_by} ${order};`;

	return db.query(queryStr, queryValues).then((response) => {
		if (response.rows.length === 0) {
			return Promise.reject({
				status: 404,
				msg: "sorry, category not found!",
			});
		}
		console.log(response.rows);
		return response.rows;
	});
};

exports.updateReviewVotes = (id, body) => {
	if (typeof body.inc_votes !== "number") {
		return Promise.reject({
			status: 400,
			msg: "bad request! body object must include 'inc_votes' property whose value must be a number ",
		});
	}

	return checkReview_idExists(id)
		.then(() => {
			return db.query(
				`
			UPDATE reviews
			SET votes = votes + $1
			WHERE review_id = $2
			RETURNING * ;
			`,
				[body.inc_votes, id]
			);
		})
		.then((result) => {
			return result.rows[0];
		});
};
