const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require("../models/user")
const router = express.Router()


router.post('/signup', (req, res, next) => {
	User.find({
		email:req.body.email
	})
	.exec()
	.then(result=>{	
		bcrypt.hash(req.body.email, 10, (err, hash)=>{
			if(err){
				res.status(500).json({
					error:err
				});
			}
			else {
				const user = new User({
					_id: new mongoose.Types.ObjectId(),
					email: req.body.email,
					password: hash
				});
				user.save().then(result=>{
					res.status(200).json(result)
				})
				.catch(err=>{
					res.status(500).json(err)	
				})
			}
		})		
	})
	.catch(err=>{
		 
	});
})

module.exports = router;