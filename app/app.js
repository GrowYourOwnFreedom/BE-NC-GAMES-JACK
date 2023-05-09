const express = require("express");
const { getCategories } = require("./controllers/categories.controllers");
const { getApi } = require("./controllers/api.controllers");
const app = express();

app.get("/api/categories", getCategories);

app.get("/api", getApi);

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).send({ msg: "sorry, server has a problem!" });
});

module.exports = app;
