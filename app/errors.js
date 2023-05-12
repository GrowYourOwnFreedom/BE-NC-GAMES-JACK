exports.catchAllError = (err, req, res, next) => {
	console.log(err);
	res.status(500).send({ msg: "sorry, server has a problem!" });
};

exports.catchCustomErrors = (err, req, res, next) => {
	if (err.status && err.msg) res.status(err.status).send({ msg: err.msg });
	else next(err);
};
exports.notFound = (err, req, res, next) => {
	if (err.code === "23503") {
		res.status(404).send({ msg: "not found!" });
	} else next(err);
};
exports.badRequest = (err, req, res, next) => {
	if (err.code === "22P02") {
		res.status(400).send({ msg: "bad request!" });
	} else next(err);
};
