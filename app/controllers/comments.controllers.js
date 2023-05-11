const {
	selectCommentsByReview_id,
	insertCommentByReview_id,
} = require("../models/comments.models");

exports.getCommentsByReview_id = (req, res, next) => {
	selectCommentsByReview_id(req.params.review_id)
		.then((comments) => {
			res.status(200).send({ comments });
		})
		.catch(next);
};

exports.postCommentByReview_id = (req, res, next) => {
	insertCommentByReview_id(req.params.review_id, req.body)
		.then((comment) => {
			res.status(201).send({ comment });
		})
		.catch(next);
};
