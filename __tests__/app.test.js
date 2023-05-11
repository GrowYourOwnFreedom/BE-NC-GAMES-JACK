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

describe("GET- /api", () => {
	test("GET: status 200 Responds with JSON describing all the available endpoints", () => {
		return request(app)
			.get("/api")
			.expect(200)
			.then(({ body: endpoints }) => {
				expect(typeof endpoints).toBe("object");
			});
	});
});

describe("GET /api/reviews/:review_id", () => {
	test("GET status 200 Responds with a review object,", () => {
		return request(app)
			.get("/api/reviews/10")
			.expect(200)
			.then(({ body: { review } }) => {
				const output = {
					review_id: 10,
					title: "Build you own tour de Yorkshire",
					designer: "Asger Harding Granerud",
					owner: "mallionaire",
					review_img_url:
						"https://images.pexels.com/photos/258045/pexels-photo-258045.jpeg?w=700&h=700",
					review_body:
						"Cold rain pours on the faces of your team of cyclists, you pulled to the front of the pack early and now your taking on exhaustion cards like there is not tomorrow, you think there are about 2 hands left until you cross the finish line, will you draw enough from your deck to cross before the other team shoot passed? Flamee Rouge is a Racing deck management game where you carefully manage your deck in order to cross the line before your opponents, cyclist can fall slyly behind front runners in their slipstreams to save precious energy for the prefect moment to burst into the lead ",
					category: "social deduction",
					created_at: "2021-01-18T10:01:41.251Z",
					votes: 10,
				};
				expect(review).toEqual(output);
			});
	});
	test("GET status 404 should return {msg: not found!} if id doesent exist ", () => {
		return request(app)
			.get("/api/reviews/10000")
			.expect(404)
			.then((response) => {
				expect(response.body.msg).toBe("not found!");
			});
	});
	test("GET status 400: should return {msg: bad request! if id is not a number", () => {
		return request(app)
			.get("/api/reviews/nonsense")
			.expect(400)
			.then((response) => {
				expect(response.body.msg).toBe("bad request!");
			});
	});
});

describe("GET /api/reviews", () => {
	test("a reviews array of review objects including key  comment_count which is the total count of all the comments with this review_id. reviews should be sorted by date in descending order.there should not be a review_body property present on any of the review objects", () => {
		return request(app)
			.get("/api/reviews")
			.expect(200)
			.then((response) => {
				response.body.reviews.forEach((review) => {
					expect(typeof review.owner).toBe("string");
					expect(typeof review.title).toBe("string");
					expect(typeof review.category).toBe("string");
					expect(typeof review.review_img_url).toBe("string");
					expect(typeof review.created_at).toBe("string");
					expect(typeof review.designer).toBe("string");
					expect(typeof review.review_id).toBe("number");
					expect(typeof review.votes).toBe("number");
					expect(typeof review.comment_count).toBe("string");
					expect(typeof review.review_body).toBe("undefined");
				});
				expect(response.body.reviews).toBeSortedBy("created_at", {
					descending: true,
					coerce: true,
				});
				expect(response.body.reviews[4].comment_count).toBe("3");
			});
	});
});
