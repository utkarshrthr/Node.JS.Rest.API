
const multer = require("multer") // to parse formdata bodies

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, 'uploads/')
	},
	filename: function(req, file, callback){
		callback(null, file.originalname)	
	}
})

const fileFilter =  function(req, file, callback) {
	if(file.mimetype === "image/jpeg" || file.mimetype === "image/png")	{
		callback(null, true)
	}
	else {
		callback(new Error("Invalid mimetype for product image"), false)	// we can pass a new Error() in place of null to reurn
	}
}

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024*1024*5 //5 mb
	},
	fileFilter: fileFilter
})

module.exports = upload