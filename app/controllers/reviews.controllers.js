const {
	selectReviewsById,
	selectReviews,
	updateReviewVotes,
} = require("../models/reviews.models");

exports.getReviewsById = (req, res, next) => {
	selectReviewsById(req.params.review_id)
		.then((review) => {
			res.status(200).send({ review });
		})
		.catch((err) => {
			next(err);
		});
};

exports.getReviews = (req, res, next) => {
	selectReviews()
		.then((reviews) => {
			res.status(200).send({ reviews });
		})
		.catch(next);
};

exports.patchReviewVotes = (req, res, next) => {
	updateReviewVotes(req.params.review_id, req.body)
		.then((review) => {
			res.status(200).send({ review });
		})
		.catch(next);
};
