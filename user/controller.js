const e = require("express");
const { client, q } = require("../db");
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, 'secret', {
		expiresIn: maxAge
	});
};
const listUsers = async function (next) {
	try {
		let result = await client.query(
			q.Map(
				q.Paginate(q.Documents(q.Collection("users"))),
				q.Lambda((x) => q.Get(x))
			)
		);

		const data = result.data.map(item => item.data)
		return data;
	} catch (error) {
		next(error);
	}

};



const insertUser = async function (user, next) {
	let { token } = user;
	let { actionType, variant } = user
	let sendToken;
	let uuid;
	if (!token) {
		uuid = uuidv4();
		sendToken = createToken(uuid);
	} else {
		const decoded = jwt.verify(token, 'secret')
		console.log(decoded);
		uuid = decoded.id
		sendToken = token
	}
	const item = {
		actionType,
		variant,
		uuid,
	}
	try {
		const result = await client.query(
			q.Create(q.Collection("users"), { data: item }));
		return {
			Message: "User was created sucessfuly",
			Data: result.data,
			timestamp: result.ts,
			Token: sendToken,
			Status: 200,
		};
	} catch (error) {
		next(error)
	}
}





module.exports = {
	listUsers,
	insertUser,

};