// dependency
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		productName: {
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

		productQuantity : {
			type: Number,
			required: [true, "Quantity (Product) is required"]
		},

        productIsActive: {
			type: Boolean,
			default: true
		}		
	}
) 

module.exports = mongoose.model("Product", productSchema);