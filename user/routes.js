const express = require('express')
const jwt = require('jsonwebtoken');
const usersController = express.Router()
const controller = require("./controller");
const moment = require('moment');
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, 'secret', {
		expiresIn: maxAge
	});
};
usersController.post('/create', async (req, res, next) => {
	const { actionType, variant } = req.body
	try {
		if (!actionType || !variant) {
			return res.status(401).send({ success: false, msg: "Payload Incomplete" })
		}
		const user = await controller.insertUser(req.body, next);
		return res.status(user.Status).json({
			Data: user.Data,
			timestamp: moment.utc(user.timestamp).format('YYYY-MM-DD HH:mm:ss'),
			Token: user.Token,
			Message: user.Message,
		});
	} catch (error) {
		next(error);
	}

})



usersController
	.get('/list', async (req, res, next) => {
		try {
			const user = await controller.listUsers(next);
			res.status(200).json({ user })
		} catch (error) {
			next(error);
		}


	})


usersController
	.get('/listVariantactions/:id', async (req, res, next) => {
		try {
			vari = req.params.id
			const user1 = await controller.listUsers(next);
			let filterdata = user1.filter(item => (item.variant == vari))
			

			res.status(200).json({ filterdata })
		} catch (error) {
			next(error);
		}


	})

usersController
	.get('/listUserActivity/:id', async (req, res, next) => {
		try {
			id = req.params.id
			const user1 = await controller.listUsers(next);
			let filterdata = user1.filter(item => (item.uuid == id))
			let mappedata = filterdata.map((item) => ({
				'ActionType': item.actionType,
				'Variant': item.variant
			}))

			res.status(200).json({ mappedata })
		} catch (error) {
			next(error);
		}

	})

usersController
	.get('/listVariantUsers/:id', async (req, res, next) => {
		try {
			vari = req.params.id
			const user1 = await controller.listUsers(next);
			//console.log(user1)
			let filterdata = user1.filter(item => (item.variant == vari))
			let processeddata = await dataprocessing(filterdata)

			res.status(200).json({ processeddata })
		} catch (error) {
			next(error);
		}


	})

usersController
	.get('/listActionUser/:id', async (req, res, next) => {
		try {
			vari = req.params.id
			const user1 = await controller.listUsers(next);
			let filterdata = user1.filter(item => (item.actionType == vari))
			let processeddata = await dataprocessing(filterdata)

			res.status(200).json({ processeddata })
		} catch (error) {
			next(error);
		}


	})
let dataprocessing = async (filterdata) => {

	let mappedata = filterdata.map((item) => item.uuid)
	//console.log(mappedata)
	const uniqueActions = [...new Set(mappedata)]
	console.log(uniqueActions)
	return uniqueActions

}
const getActionByUserID = async (userid) => {
	const user1 = await controller.listUsers();
	let filterdata = user1.filter(item => (item.uuid == userid))
	let mappedata = filterdata.map((item) => ({
		'ActionType': item.actionType,
		'Variant': item.variant
	}))
	
	return mappedata;
}
module.exports = usersController