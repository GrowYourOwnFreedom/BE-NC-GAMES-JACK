const express = require("express");
const { getCategories } = require("./controllers/categories.controllers");
const {
	getReviewsById,
	getReviews,
	patchReviewVotes,
} = require("./controllers/reviews.controllers");
const { getApi } = require("./controllers/api.controllers");
const {
	getCommentsByReview_id,

	removeCommentByComment_id,

	postCommentByReview_id,

} = require("./controllers/comments.controllers");
const { getUsers } = require("./controllers/users.controllers");
const app = express();

app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api", getApi);

app.get("/api/reviews/:review_id", getReviewsById);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id/comments", getCommentsByReview_id);


app.get("/api/users", getUsers);

app.post("/api/reviews/:review_id/comments", postCommentByReview_id);

app.patch("/api/reviews/:review_id", patchReviewVotes);

app.delete("/api/comments/:comment_id", removeCommentByComment_id);


app.use((err, req, res, next) => {
	if (err.code === "22P02") {
		res.status(400).send({ msg: "bad request!" });
	} else next(err);
});

app.use((err, req, res, next) => {
	if (err.code === "23503") {
		res.status(404).send({ msg: "not found!" });
	} else next(err);
});

app.use((err, req, res, next) => {
	if (err.status && err.msg) res.status(err.status).send({ msg: err.msg });
	else next(err);
});

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).send({ msg: "sorry, server has a problem!" });
});

module.exports = app;
