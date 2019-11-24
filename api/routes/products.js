const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

const upload = require("../../fileuploadconfig")

const Product = require("../models/product")

router.get("/", (req, res, next)=>{
	Product.find() // select * from table;
			.select('-price') 	// use - symbol to explicitly exclude a column
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

router.post("/", upload.single("productImg"), (req, res, next)=>{ 
	let product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
		productImg: req.file.path,
	});
	product.save()
	.then(result => {
		res.status(200).json(result) 
	})
	.catch(err=>{
		res.status(500).json(err) 
	})
})

router.get("/:productId", (req, res, next) => { // http://localhost:3000/products/123
	const id = req.params.productId; // get passed variable from request
	Product.findById(id).exec()
			.then(result=>{
				if(result){
					res.status(200).json(result)
				}
				else {
					res.status(404).json({
						"status":"not found",
						"code":404,
						"message": "No product exist for this id"
					})
				}
			})
			.catch(err=>{
				if(err.name==="CastError")
					res.status(500).json({
						"status":"failed",
						"code":500,
						"message": "Invalid product id"
					})
			});
})

router.patch("/:productId", (req, res, next) => { 
	const productId=req.params.productId;
	Product.update(
		{
			_id: productId
		},
		{
			$set:{
				name: req.body.newName,
				price: req.body.newPrice
			}
		})
		.then(result=>{
			res.status(200).json(result)
		})
		.catch(err=>{
			res.status(500).json(err)
		});
})

router.delete("/:productId", (req, res, next) => { 
	Product.remove({
		_id:req.params.productId
	})
	.then(result=>{
		res.status(200).json(result)
	})
	.catch(err=>{
		res.status(500).json(err)
	});
})

module.exports = router;
