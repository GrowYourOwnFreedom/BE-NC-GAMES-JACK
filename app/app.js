const express = require("express");
const { getCategories } = require("./controllers/categories.controllers");
const app = express();

app.use(express.json());

app.get("/api/categories", getCategories);

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).send({ msg: "sorry, server has a problem!" });
});

module.exports = app;
