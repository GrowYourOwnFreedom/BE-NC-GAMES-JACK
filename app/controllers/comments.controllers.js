const {
	selectCommentsByReview_id,

	deleteCommentByComment_id,

	insertCommentByReview_id,
	updateCommentVotes,
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

exports.postCommentByReview_id = (req, res, next) => {
	insertCommentByReview_id(req.params.review_id, req.body)
		.then((comment) => {
			res.status(201).send({ comment });
		})
		.catch(next);
};

exports.patchCommentByComment_id = (req, res, next) => {
	updateCommentVotes(req.params.comment_id, req.body).then(comment => {
		res.status(200).send({ comment })
	}).catch(next)
}
