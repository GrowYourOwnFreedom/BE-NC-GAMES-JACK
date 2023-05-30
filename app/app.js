const express = require("express");
const cors = require('cors');

const apiRouter = require("./routes/api-router");
const {
	catchAllError,
	catchCustomErrors,
	notFound,
	badRequest,
} = require("./errors");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.use(badRequest);

app.use(notFound);

app.use(catchCustomErrors);

app.use(catchAllError);

module.exports = app;
