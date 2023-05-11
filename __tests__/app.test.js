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
				expect(typeof review.title).toBe("string");
				expect(typeof review.designer).toBe("string");
				expect(typeof review.owner).toBe("string");
				expect(typeof review.review_img_url).toBe("string");
				expect(typeof review.review_body).toBe("string");
				expect(typeof review.category).toBe("string");
				expect(typeof review.created_at).toBe("string");
				expect(typeof review.votes).toBe("number");
				expect(review.review_id).toBe(10);
			});
	});
	test("GET status 404 should return {msg: not found!} if id doesent exist ", () => {
		return request(app)
			.get("/api/reviews/10000")
			.expect(404)
			.then((response) => {
				expect(response.body.msg).toBe("sorry, review_id not found!");
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

describe("GET-/api/reviews/:review_id/comments", () => {
	test("should respond with an array of comments for the given review_id, most recent comments first ", () => {
		return request(app)
			.get("/api/reviews/3/comments")
			.expect(200)
			.then(({ body: { comments } }) => {
				comments.forEach((comment) => {
					expect(typeof comment.comment_id).toBe("number");
					expect(typeof comment.votes).toBe("number");
					expect(typeof comment.review_id).toBe("number");
					expect(typeof comment.created_at).toBe("string");
					expect(typeof comment.author).toBe("string");
					expect(typeof comment.body).toBe("string");
				});
				expect(comments).toBeSortedBy("created_at", {
					descending: true,
					coerce: true,
				});
				expect(comments[0].comment_id).toBe(6);
				expect(comments[0].votes).toBe(10);
				expect(comments[0].review_id).toBe(3);
				expect(comments[0].created_at).toBe("2021-03-27T19:49:48.110Z");
				expect(comments[0].author).toBe("philippaclaire9");
				expect(comments[0].body).toBe(
					"Not sure about dogs, but my cat likes to get involved with board games, the boxes are their particular favourite"
				);
			});
	});
	test("GET-status 404 review_id not found!", () => {
		return request(app)
			.get("/api/reviews/20/comments")
			.expect(404)
			.then((response) => {
				expect(response.body.msg).toBe("sorry, review_id not found!");
			});
	});
	test('GET-status 400 "bad request!" ', () => {
		return request(app)
			.get("/api/reviews/nonsense/comments")
			.expect(400)
			.then((response) => {
				expect(response.body.msg).toBe("bad request!");
			});
	});
	test("GET-status 200 returns empty array if review_id exists but there are no comments", () => {
		return request(app)
			.get("/api/reviews/1/comments")
			.expect(200)
			.then((response) => {
				expect(response.body.comments).toEqual([]);
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
					expect(review).not.toHaveProperty("review_body");
				});
				expect(response.body.reviews).toBeSortedBy("created_at", {
					descending: true,
					coerce: true,
				});
				expect(response.body.reviews[4].comment_count).toBe("3");
			});
	});
});
