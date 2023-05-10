const db = require("../../db/connection");
const { readFile } = require("fs/promises");

exports.getEndpoints = () => {
	return readFile(`${__dirname}/../../endpoints.json`, "utf8").then(
		(result) => {
			return JSON.parse(result);
		}
	);
};
