const {
	getCommentsByReview_id,
	postCommentByReview_id,
} = require("../controllers/comments.controllers");
const {
	getReviews,
	getReviewsById,
	patchReviewVotes,
	postReview,
	removeReviewByReview_id,
} = require("../controllers/reviews.controllers");

const reviewsRouter = require("express").Router();

reviewsRouter.route("/").get(getReviews).post(postReview);

reviewsRouter.route("/:review_id").get(getReviewsById).patch(patchReviewVotes).post(removeReviewByReview_id)

reviewsRouter
	.route("/:review_id/comments")
	.get(getCommentsByReview_id)
	.post(postCommentByReview_id);

module.exports = reviewsRouter;
