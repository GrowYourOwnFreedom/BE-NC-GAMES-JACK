const app = require("../app/app");
const request = require("supertest");
const db = require("../db/connection");
const data = require("../db/data/test-data");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET-/api/categories", () => {
	test("GET status 200, should return an array of category objects, each of which should have the following properties: slug, description", () => {
		return request(app)
			.get("/api/categories")
			.expect(200)
			.then(({ body: { categories } }) => {
				expect(categories.length).toBe(4);
				categories.forEach((category) => {
					expect(typeof category.slug).toBe("string");
					expect(typeof category.description).toBe("string");
				});
			});
	});
});
