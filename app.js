const mongoose = require("./dbconfig")
const express = require('express') // importing express in project
const app = express() // initializing express
const bodyParser = require('body-parser')  /*body parsing middleware. Parse incoming request bodies in a middleware before your handlers, available under the req.body property.*/
const morgan = require('morgan')
app.use(morgan('dev'))

// /* Express also provide urlencoded and json methods(support body methods). 
//    We can use that instead of body-parser.
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   
// 	**Note:- Please make sure you have express: "^4.15.2". 

// app.use(bodyParser.urlencoded({extend:false}))
// app.use(bodyParser.json())

const productRoutes = require("./api/routes/products")
const orderRoutes = require("./api/routes/orders")
const userRoutes = require("./api/routes/users")

app.use("/products", productRoutes)
app.use('/orders', orderRoutes)
app.use('/users', userRoutes)

app.use((req, res, next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	if(req.method === "OPTIONS"){
		res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, PATCH, GET");
		res.status().json({});
	}
})

app.use("/uploads", express.static("uploads"))

app.use((req, res, next)=>{
	const error = new Error("Not found");
	error.status = 404;
	next(error);
}); 

app.use((error, req, res, next)=>{
	res.status(error.status || 500);
	res.json({
		error:error.message
	});
}); 
  
module.exports = app;
