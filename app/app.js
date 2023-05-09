const express = require("express");
const { getCategories } = require("./controllers/categories.controllers");
const app = express();

app.use(express.json());

module.exports = app;

app.get("/api/categories", getCategories);
