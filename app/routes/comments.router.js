const {
	removeCommentByComment_id,
} = require("../controllers/comments.controllers");

const commentsRouter = require("express").Router();

commentsRouter.delete("/:comment_id", removeCommentByComment_id);

module.exports = commentsRouter;
