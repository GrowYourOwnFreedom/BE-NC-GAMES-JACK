const db = require("../../db/connection");
const { checkCategoryExists } = require("../utils");

exports.selectCategories = () => {
	return db
		.query(
			`
    SELECT * FROM categories;
    `
		)
		.then(({ rows: categories }) => {
			return categories;
		});
};

exports.addCategory = (body) => {
	return checkCategoryExists(body.slug).then(() => {
		return db
			.query(
				`
			INSERT INTO categories
			(slug, description)
			VALUES ($1, $2)
			RETURNING *;
			`,
				[body.slug, body.description]
			)
			.then((result) => {
				return result.rows[0];
			});
	});
};
