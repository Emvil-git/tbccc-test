const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is requred"]
        },
        username: {
            type: String,
            required: [true, "Username is requred"]
        },
        email: {
            type: String,
            required: [true, "Username is requred"]
        },
        password: {
            type: String,
            required: [true, "Username is requred"]
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        userCart: [
            {
                _id:false,
                productId: {
                    type: String,
                    required: [true, "ProductID (User - Cart) required"]
                },
                quantity: {
                    type: Number,
                    required: [true, "Product quantity (User - Cart) required"]
                }
            }
        ]
    }
)

module.exports = mongoose.model("User", userSchema);