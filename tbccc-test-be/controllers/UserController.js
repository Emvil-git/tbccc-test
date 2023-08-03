const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const auth = require("../auth.js");
const Product = require("../models/Product.js");

module.exports.signUp = async (request, response) => {
    let newUser = new User({
        name: request.body.name,
        username: request.body.username,
        email: request.body.email,
        password: bcrypt.hashSync(request.body.password, 10), //hashes the user's password
    })

    return await newUser.save().then((user,err) => {
        if (err) response.send(err);
        response.send(user);
    }
    )
}

// Check username availability
module.exports.checkIfUsernameExists = (request, response) =>{
	return User.find({username: request.body.username}).then(result =>{
		if(result.length > 0){
			return response.send(true);
		}
		else{
			return	response.send(false);
		}
	})
	.catch(error => response.send(error));
}

// Check if email is used
module.exports.checkIfEmailExists = (request, response) =>{
	return User.find({email: request.body.email}).then(result =>{
		if(result.length > 0){
			return response.send(true);
		}
		else{
			return	response.send(false);
		}
	})
	.catch(error => response.send(error));
}

module.exports.getAllUsers = (request, response) => {
    const userData = auth.decode(request.headers.authorization);

    if (userData.isAdmin){
        return User.find({}).then(result => response.send(result));
    } else {
        return response.send({
            "status": 403,
            "message": "This is an ADMIN feature"
        });
    }
}

module.exports.getUserInfo = (request, response) => {
    const userData = auth.decode(request.headers.authorization);

	return User.findById(userData.id).then(result =>{
		result.password = "*******";
		response.send(result);
	}).catch(err => response.send(err));
}

module.exports.updateUserInfo = (request, response) => {
    const authData = auth.decode(request.headers.authorization);
    const newUserInfo = request.body;

   return User.findByIdAndUpdate(authData.id, {
        name: newUserInfo.name,
        username: newUserInfo.username,
        email: newUserInfo.email,
    })
    .then((result, error) => {
        if (error) response.send(error);
        response.send(result);
    })
}

module.exports.changeUserPassword = async (request,response) => {
    const authData = auth.decode(request.headers.authorization)
    let isPasswordCorrect;

    // Checks if password entered to confirm is correct
    await User.findById(authData.id).then(result => {
        if (!result) {
            return response.send(
                {
                    "status": 404,
                    "message": "User data not found"
                }
            )
        } else {
            isPasswordCorrect = bcrypt.compareSync(request.body.password, result.password);
        }
    })

    if (isPasswordCorrect) {
        User.findByIdAndUpdate(authData.id,{
            password: bcrypt.hashSync(request.body.newPass, 10)
        }).then(result => {
            return response.send(result)
        }).catch(error => {
            return response.send(error)
        })
    } else {
        return response.send(
            {
                "status": 403,
                "message": "Incorrect Password"
            }
        ) 
    }
}

module.exports.deleteUserAccount = async (request,response) => {
    const authData = auth.decode(request.headers.authorization)
    let isPasswordCorrect;

    // Checks if password entered to confirm is correct
    await User.findById(authData.id).then(result => {
        if (!result) {
            return response.send(
                {
                    "status": 404,
                    "message": "User not found"
                }
            )
        } else {
            isPasswordCorrect = bcrypt.compareSync(request.body.password, result.password);
        }
    })

    if (isPasswordCorrect) {
        User.findByIdAndDelete(authData.id).then((result)=>{
            return response.send({
                "status":200,
                "message": "Account deletion successful"
            })
        }).catch(error => {
            return response.send({
                "status":403,
                "message": "Incorrect Password or Error deleting Account"
            })
        })
    } else {
        return response.send(
            {
                "status": 403,
                "message": "Incorrect Password"
            }
        ) 
    }
}

module.exports.adminDeleteAccount = async (request,response) => {
    const authData = auth.decode(request.headers.authorization)

    if (authData.isAdmin === true) {
        User.findByIdAndDelete(request.params.userId).then((result)=>{
            return response.send({
                "status":200,
                "message": "Account deletion successful"
            })
        }).catch(error => {
            return response.send({
                "status":403,
                "message": "Incorrect Password or Error deleting Account"
            })
        })
    } else {
        return response.send({
            "status":403,
            "message": "This is an ADMIN-ONLY feature"
        })
    }
}

// user log in
module.exports.logIn = (request, response) => {
    return User.findOne({email: request.body.email}).then(
        result => {
            if (result == null) {
                return response.send({
                    "status": 404,
                    "message": "Email not in use"
                })
            }
            else {
                const isPasswordCorrect = bcrypt.compareSync(request.body.password, result.password);

                if(isPasswordCorrect) {
                    response.send({access: auth.createAccessToken(result)});
                } else {
                    return response.send({
                        "status": 403,
                        "message": "Password Incorrect"
                    })
                }
            } 

            
        }
    )
}

// Functions for adding to cart
module.exports.addToCart = async (request, response) => {
    const userData = auth.decode(request.headers.authorization);

    const {productId, quantity} = request.body;

    if (!userData.isadmin){
        await User.findById(userData.id)
        .then(async user => {
            let product = await Product.findById(productId).then(result => result)
            .catch(error => {
                return response.send({
                    "status":404,
                    "message":"Product not found"
                })
            });

            if (!product || !product.isListed || !product.stocks || product.stocks - quantity <= 0){
                return response.send({
                    "status":500,
                    "message":"Product can't be added to cart"
                })
            } else {
                const index = user.cart.map(item => item.productId).indexOf(product.id);

                if (index === -1) {
                    user.cart.push({
                        productId: productId,
                        quantity: quantity,
                        subTotal: product.price * quantity
                    });
                    
                } else {
                    user.cart[index].quantity += quantity;
                    user.cart[index].subTotal = product.price * quantity;
                }

                user.save();

                return response.send(user);
            }

        }).catch(error => {
            return response.send({
                "status":404,
                "message":"User not found"
            })
        })

    } else {
        return response.send({
            "status":403,
            "message":"Adding to cart is a CUSTOMER-ONLY feature"
        })
    }
}

module.exports.updateProductCartQuantity = async (request, response) => {
    const user = auth.decode(request.headers.authorization);

    const {productId, quantity} = request.body;

    if (!user.isadmin){
        await User.findById(user.id)
        .then(async user => {       
            if (user.cart.length === 0) return response.send('Cart is empty') 

            let product = await Product.findById(productId).then(result => result)
            .catch(error => {
                return response.send({
                    "status":404,
                    "message":"Product not found"
                })
            });

            if (!product || !product.isListed || !product.stocks || product.stocks - quantity <= 0){
                return response.send({
                    "status":500,
                    "message":"Product can't be added to cart"
                })
            } else {

                const index = user.cart.map(item => item.productId).indexOf(product.id);

                if (index === -1) {
                    return response.send({
                        "status": 404,
                        "message" : "Item not in cart"
                    });
                } else {
                    user.cart[index].quantity = quantity;
                    user.cart[index].subTotal = product.price * quantity;
                }

                user.save();

                return response.send(user);
            }

        }).catch(error => {
            return response.send({
                "status":404,
                "message":"User not found"
            })
        })

    } else {
        return response.send({
            "status":403,
            "message":"Changing cart product is a CUSTOMER-ONLY feature"
        })
    }
}

module.exports.removeFromCart = async (request, response) => {
    const user = auth.decode(request.headers.authorization);

    const {productId} = request.body;

    if (!user.isadmin){
        await User.findById(user.id)
        .then(async user => {
            if (user.cart.length === 0) return response.send(false) 

            let product = await Product.findById(productId).then(result => result)
            .catch(error => {
                return response.send({
                    "status":500,
                    "message":"Error retrieving product"
                })
            });

            if (!product || !product.isListed){
                return response.send({
                    "status":404,
                    "message":"Product not found"
                })
            } else {
                const index = user.cart.map(item => item.productId).indexOf(product.id);

                if (index === -1) {
                    return response.send({
                        "status": 404,
                        "message" : "Item not in cart"
                    });
                } else {
                    user.cart.splice(index, 1);
                }

                user.save();

                return response.send(user);
            }

        }).catch(error => {
            return response.send({
                "status":404,
                "message":"User not found"
            })
        })

    } else {
        return response.send({
            "status":403,
            "message":"Removing cart product is a CUSTOMER-ONLY feature"
        })
    }
}

module.exports.getItemSubtotal = async (request, response) => {
    const user = auth.decode(request.headers.authorization);

    const productId = request.params.productId;

    if (!user.isadmin){
        await User.findById(user.id)
        .then(async user => {
            
            if (user.cart.length === 0) return response.send('Cart is empty') 

            let product = await Product.findById(productId).then(result => {
                result}).catch(error => {
                return response.send({
                    "status":404,
                    "message":"Product not found"
                })
            });

            if (!product || !product.isListed){
                return response.send({
                    "status":404,
                    "message":"Product not found"
                })
            } else {
                const index = user.cart.map(item => item.productId).indexOf(product.id);

                if (index === -1) {
                    return response.send({
                        "status": 404,
                        "message" : "Item not in cart"
                    });
                } else {
                    return response.send({"item_subtotal" : user.cart[index].subTotal});
                }
            }

        }).catch(error => {
            return response.send({
                "status":404,
                "message":"User not found"
            })
        })

    } else {
        return response.send({
            "status":403,
            "message":"Removing cart product is a CUSTOMER-ONLY feature"
        })
    }
}

module.exports.getCartTotal = async (request, response) => {
    const user = auth.decode(request.headers.authorization);

    if (!user.isadmin){
        await User.findById(user.id)
        .then(async user => {
            
            if (user.cart.length === 0) return response.send('Cart is empty') 

            let totalPrice = 0;

            user.cart.forEach(
                item => 
                totalPrice += item.subTotal
            )
            response.send({"cart_total" : totalPrice});

        }).catch(error => {
                return response.send({
                "status":404,
                "message":"User not found"
            })
        })

    } else {
        return response.send({
            "status":403,
            "message":"Removing cart product is a CUSTOMER-ONLY feature"
        })
    }
}