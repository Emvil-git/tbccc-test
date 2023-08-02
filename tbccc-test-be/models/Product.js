// dependency
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Product Name is required"]
		},

		description: {
			type: String,
			required: [true, "Product Description is required"]
		},

		price : {
			type: Number,
			required: [true, "Price is required"]
		},

		quantity : {
			type: Number,
			required: [true, "Quantity (Product) is required"]
		},

        isActive: {
			type: Boolean,
			default: true
		}		
	}
) 

module.exports = mongoose.model("Product", productSchema);