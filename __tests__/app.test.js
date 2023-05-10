describe("GET /api/reviews/:review_id", () => {
	test("GET status 200 Responds with a review object,", () => {
		return request(app)
			.get("/api/reviews/10")
			.expect(200)
			.then(({ body: { review } }) => {
				const output = [
					{
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
					},
				];
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
