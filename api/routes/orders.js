const express = require("express")

const mongoose = require("mongoose")
const router = express.Router()

const Order = require("../models/order")

router.get("/", (req, res, next)=>{
	Order.find()
			.select('name quantity -_id') 	// use - symbol to explicitly exclude a column
			.populate("product", "name price -_id")
			.exec()
			.then(result=>{
				res.status(200).json({
					"count":result.length,
					"products":result
				});
			})
			.catch(err=>{
				res.status(500).json(err);
			})
})

router.post("/", (req, res, next)=>{
	const order = new Order({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		quantity: req.body.quantity,
		product: req.body.productId
	});

	order.save().then(result=>{
		res.status(200).json(result)
	})
	.catch(err=>{
		res.status(500).json(err)
	});
})

router.get("/:orderId", (req, res, next) => { // http://localhost:3000/orders/123
	const id = req.params.orderId; // get passed variable from request
	res.status(200).json({
		"message": "handling GET requests to "+id
	})
})

router.patch("/", (req, res, next) => { 
	res.status(200).json({
		"message": "handling PATCH requests to /orders"
	})
})

router.delete("/", (req, res, next) => { 
	res.status(200).json({
		"message": "handling DELETE requests to /orders"
	})
})

module.exports = router;
