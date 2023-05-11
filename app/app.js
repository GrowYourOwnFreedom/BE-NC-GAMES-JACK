const express = require("express");
const { getCategories } = require("./controllers/categories.controllers");
const {
	getReviewsById,
	getReviews,
} = require("./controllers/reviews.controllers");
const { getApi } = require("./controllers/api.controllers");
const {
	getCommentsByReview_id,
} = require("./controllers/comments.controllers");
const { getUsers } = require("./controllers/users.controllers");
const app = express();

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewsById);

app.get("/api/reviews", getReviews);

app.get("/api", getApi);

app.get("/api/reviews/:review_id/comments", getCommentsByReview_id);

app.get("/api/users", getUsers);

app.use((err, req, res, next) => {
	if (err.code === "22P02") {
		res.status(400).send({ msg: "bad request!" });
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
