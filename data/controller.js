const e = require("express");
const { client, q } = require("../db");
const { v4: uuidv4 } = require('uuid');

const listUsers = async function () {
	let result = await client.query(
		q.Map(
			q.Paginate(q.Documents(q.Collection("users"))),
			q.Lambda((x) => q.Get(x))
		)
	);
    console.log("Data",result)
    const data=result.data.map(item=>item.data)
    return data;
};

const VariantUsers = async function (variant) {
	console.log(variant)
	let result = await client.query(
		q.Map(
			q.Paginate(q.Documents(q.Collection("users"))),
			q.Lambda((x) => q.Get(x))
		)
	);
    console.log("Data",result)
    const data=result.data.map(item=>item.data)
    return data;
};

const insertUser = async function (user) {
    user.uuid=uuidv4();
    // console.log(user)
    const result = await client.query(
        q.Create(q.Collection("users"),{data:user} )
    );
	//console.log(result)
    return {
        Message: "User was created sucessfuly",
        Data: result.data,
        Status: 200,
    };
};
const userVariant=async(req,res)=>{
	console.log("Inside User Varieant")
}


module.exports = {
	VariantUsers,
    listUsers,
    insertUser,
	userVariant
	
};