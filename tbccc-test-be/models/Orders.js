const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		orderTotal: {
			type: Number,
			required: [true, "Order Total required"]
		},
		orderDate : {
			type: Date,
			default: new Date()
		},
		userId : {
			type: String,
			required: [true, "UserID (Order) required"]
		},
        orderStatus: {
            type: String,
            required: [true, ""]
        },
		orderProducts : [
            {
				_id: false,
                productId : {
                    type : String,
                    required : [true, "ProductID (Order) required"]
                },
                amount : {
                    type : Number,
                    required : [true, "Product Amount (Order) required"]
                }
            }
        ]
		
	}
) 

module.exports = mongoose.model("Order", orderSchema);