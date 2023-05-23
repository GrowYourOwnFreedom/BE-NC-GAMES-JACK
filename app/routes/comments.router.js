const {
	removeCommentByComment_id,
	patchCommentByComment_id,
} = require("../controllers/comments.controllers");

const commentsRouter = require("express").Router();

commentsRouter
	.route("/:comment_id")
	.delete(removeCommentByComment_id)
	.patch(patchCommentByComment_id);

module.exports = commentsRouter;
