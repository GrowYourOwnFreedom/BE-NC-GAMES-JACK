const {
	selectReviewsById,
	selectReviews,
	updateReviewVotes,
	uploadReview,
	deleteReviewByReview_id
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
	const { category, sort_by, order } = req.query;
	selectReviews(category, sort_by, order)
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
exports.postReview = (req, res, next) => {
	uploadReview(req.body).then((review)=> {
		res.status(201).send({ review })
	}).catch(next)
}
exports.removeReviewByReview_id = (req, res, next) => {
	deleteReviewByReview_id(req.params.review_id, req.body.username).then(()=>{
		res.status(204).send()
	}).catch(next)
}
