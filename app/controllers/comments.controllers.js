const {
	selectCommentsByReview_id,
	deleteCommentByComment_id,
} = require("../models/comments.models");

exports.getCommentsByReview_id = (req, res, next) => {
	selectCommentsByReview_id(req.params.review_id)
		.then((comments) => {
			res.status(200).send({ comments });
		})
		.catch(next);
};

exports.removeCommentByComment_id = (req, res, next) => {
	deleteCommentByComment_id(req.params.comment_id)
		.then(() => {
			res.status(204).send();
		})
		.catch(next);
};
