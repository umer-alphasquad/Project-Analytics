const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const requireAuth=require('./..//middleware/authMiddleWare');
const controller = require("./controller");

// router.get("/", async (request, response) => {
// 	let users = await controller.listUsers();

// 	return response.status(200).json(users);
// });


// router.post("/update/:id", async (request, response) => {
// 	const requestUser = request.body;
// 	const reference = request.params.id;

// 	const updateResult = await controller.updateUser(requestUser, reference);

// 	response.status(updateResult.Status).json({
// 		Data: updateResult.Data,
// 		Message: updateResult.Message,
// 	});
// });

router.post("/new", async (request, response) => {
	
	let requestUser = request.body
console.log(request.body)

	let insertionResult = await controller.insertUser(requestUser);
	console.log(insertionResult)

	return response.status(insertionResult.Status).json({
		Data: insertionResult.Data,
		Message: insertionResult.Message,
	});
});

module.exports = router;