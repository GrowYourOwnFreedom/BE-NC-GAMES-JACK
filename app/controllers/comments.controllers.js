const { selectCommentsByReview_id } = require("../models/comments.models");

exports.getCommentsByReview_id = (req, res, next) => {
	selectCommentsByReview_id(req.params.review_id)
		.then((comments) => {
			res.status(200).send({ comments });
		})
		.catch(next);
};
