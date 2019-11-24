const mongoose = require('../../dbconfig')

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: {
		type:String,
		required:true,
		unique: true,
		match: /[]/
	},
	password:{
		type:String,
		required:true
	}	
});

module.exports = mongoose.model("User", userSchema)