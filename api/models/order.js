const mongoose = require('../../dbconfig')

const orderSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type:String,
		required:true
	},
	product:{
		type:mongoose.Schema.Types.ObjectId,
		required:true,
		ref: "Product"
	},
	quantity: {
		type:Number,
		default: 1
	}
});

module.exports = mongoose.model("Order", orderSchema)