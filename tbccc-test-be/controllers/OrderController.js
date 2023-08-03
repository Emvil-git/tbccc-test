const mongoose = require("mongoose");
const Order = require("../models/order.js");
const Product = require("../models/Product.js");
const User = require("../models/User.js");
const auth = require("../auth.js");

module.exports.order = async (request, response) => {
    const userData = auth.decode(request.headers.authorization)

    if (!userData.isAdmin) {
            let orderData = {
            orderTotal: 0,
            userId: userData.id,
            orderProducts: []
        }

        await User.findById(userData.id).then(async user => {
            const {cart} = user

            if (cart && cart.length !== 0) {
                // iterate through user cart array
                for (let i = 0; i < cart.length; i++) {
                    let product = await Product.findById(cart[i].productId).then(result => result).catch(error => {
                        return response.send({
                            "status": 404,
                            "message": "Product not found"
                        })
                    });
    
                    // checks if product is available to purchase/stocks are enough
                    if (!product || !product.isListed || !product.productQuantity || product.productQuantity - cart[i].quantity <= 0){
                        return response.send({
                            "status": 500,
                            "message": "Unable to fulfill order (product)"
                        })
                    } else {
                        orderData.products.push(
                            {
                                productId: cart[i].productId,
                                quantity: cart[i].quantity
                            }
                        )
                        orderData.orderTotal += product.price * cart[i].quantity;
                        product.productQuantity -= cart[i].quantity;
                        product.save();

                    }
                }

                // clear user cart items so it is empty for the next purchase
                while(cart.length !== 0) {
                    user.cart.pop()
                }

                user.save();
    
                let newOrder = new Order(orderData);
    
                await newOrder.save()
                .then(result => {
                    return response.send(newOrder)
                }).catch(err => {
                    return response.send({
                        "status":500,
                        "message":"Error creating order"
                    })
                })
            } else {
                return response.send({
                    "status":404,
                    "message":"User Cart empty or does not exist"
                })
            }
        })

    } else {
        return response.send({
            "status":403,
            "message":"Ordering is a CUSTOMER-ONLY feature"
        })
    }
}

module.exports.getAllOrders = (request, response) => {
    const isAdmin = auth.decode(request.headers.authorization).isAdmin;

    if(isAdmin) {
        Order.find({}).then(result => response.send(result));
    } else {
        return response.send({
            "status": 403,
            "message": "Viewing all orders is an ADMIN-ONLY feature"
        })
    }
}

// Only admin can view all orders in the system, customers can view their own orders only
module.exports.getUserOrders = async (request, response) => {
    const user = auth.decode(request.headers.authorization);

    if(user.isAdmin) {
        return response.send({
            "status": 403,
            "message": "Get customer orders is a CUSTOMER-ONLY feature"
        })
    }

    await Order.find({userId : user.id})
    .then(result => response.send(result))
    .catch(error => {
            return response.send({
            "status": 500,
            "message": "Error getting customer orders"
        })
   })
}

module.exports.cancelOrder = async (request, response) => {
    const userData = request.headers.authorization;
    let canCancel;

    // check if order to be cancelled was made by user
    await Order.findById(request.params.orderId).then(result => {
        canCancel = request.userId === userData.id;
    }).catch(err => {
        return response.send({
            "status" : 500,
            "message" : "Error retrieving order data"
        })
    })

    if (canCancel) {
        return Order.findByIdAndDelete(request.params.orderId).then(async result => {
            const orderProductsData = [...result.orderProducts];

            // iterate through each product in order product list to return stock
            for (let i = 0; i < orderProductsData.length; i++) {
                let product = await Product.findById(orderProductsData[i].productId).then(result => result)
                .catch(error => {
                    return response.send({
                        "status": 500,
                        "message": `Unable to find Product#${orderProductsData[i].productId} (cancel order)`
                    })
                })

                if (!product) {
                    return response.send({
                        "status": 500,
                        "message": "Unable to fulfill order (product)"
                    })
                } else {
                    product.productQuantity -= cart[i].quantity;
                    product.save();
                }
            }

            return response.send({
                "status" : 200,
                "message" : `Order ${result._id} cancelled successfully`
            })
        }).catch(err => {
            return response.send({
                "status" : 500,
                "message" : `Error retrieving order`
            })
        }) 
    } else {
        return response.send({
                "status" : 403,
                "message" : `Cannot cancel another user's order`
            })
    }
}