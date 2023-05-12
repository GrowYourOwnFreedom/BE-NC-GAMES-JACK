const {
	getCommentsByReview_id,
	postCommentByReview_id,
} = require("../controllers/comments.controllers");
const {
	getReviews,
	getReviewsById,
	patchReviewVotes,
} = require("../controllers/reviews.controllers");

const reviewsRouter = require("express").Router();

reviewsRouter.get("/", getReviews);

reviewsRouter.route("/:review_id").get(getReviewsById).patch(patchReviewVotes);

reviewsRouter
	.route("/:review_id/comments")
	.get(getCommentsByReview_id)
	.post(postCommentByReview_id);

module.exports = reviewsRouter;
