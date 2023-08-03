const mongoose = require("mongoose");
const Product = require("../models/Product.js");
const auth = require("../auth.js");

module.exports.createProduct = (request, response) => {
    const authData = auth.decode(request.headers.authorization)

    if (authData.isAdmin == true) {
        let newProduct = new Product(
            {
                productName: request.body.productName,
                description: request.body.description,
                price: request.body.price,
				productQuantity: request.body.productQuantity
            }
        )
    
        return newProduct.save().then((newProduct, error) => {
            if(error){
                return response.send({
                    "status": 500,
                    "message" : "Error creating Product"
                });
            } else {
                return response.send(newProduct);
            }
        })
    } else {
        return response.send({
            "status": 403,
            "message": "This is an ADMIN feature"
        });
    }
}

module.exports.getListedProducts = (request, response) => {
    return Product.find({isListed:true}).then(
        result => response.send(result))
        .catch(error => {
            return (
                response.send({
                    "status": 500,
                    "message": "Error retrieving listed products"
                })
            )
        });
}

module.exports.getAllProducts = (request, response) => {
    const authData = auth.decode(request.headers.authorization)

    if (authData.isAdmin == true) {
        return Product.find({}).then(
            result => response.send(result))
        .catch(error => {
            return (
                response.send({
                    "status": 500,
                    "message": "Error retrieving products"
                })
            )
        });
    } else {
        return response.send({
            "status": 403,
            "message": "This is an ADMIN feature"
        });
    }
}

module.exports.getProductInfo = (request, response) => {
    return Product.findById(request.params.productId).then(
        result => response.send(result))
        .catch(error => {
            return (
                response.send({
                    "status": 500,
                    "message": "Error retrieving product info"
                })
            )
        });
}

module.exports.updateProductInfo = (request, response) => {
    const authData = auth.decode(request.headers.authorization);
    const productId = request.params.productId;
    const product = request.body;

    if (authData.isAdmin === true) {
        return Product.findByIdAndUpdate(productId, {
            name: product.name,
            description: product.description,
            price: product.price,
            stocks: product.stocks
        })
        .then((result, error) => {
            if (error) response.send(error);
            response.send(result);
        })
    } else {
       return response.send({
            "status": 403,
            "message": "This is an ADMIN feature"
        }); 
    }
}

module.exports.unlistProduct = (request, response) => {
    const authData = auth.decode(request.headers.authorization);

	if(authData.isAdmin){
		return Product.findByIdAndUpdate(request.params.productId,
			{
				isListed: false
			}
		).then((result, error)=>{
			if(error){
				response.send({
                    "status": 500,
                    "message": "Error unlisting"
                })
			}
                response.send({
                    "status": 200,
                    "message": `Product ${result.productName} is now unlisted`
                })
		})
	}
	else{
		return response.send({
            "status": 403,
            "message": "This is an ADMIN feature"
        });
    }
}

module.exports.listProduct = (request, response) => {
    const authData = auth.decode(request.headers.authorization);

	if(authData.isAdmin){
		return Product.findByIdAndUpdate(request.params.prodId,
			{
				isListed: true
			}
		).then((result, error)=>{
			if(error){
				response.send({
                    "status": 500,
                    "message": "Error listing product"
                })
			}
                response.send({
                    "status": 200,
                    "message": `Product ${result.productName} is now listed`
                })
		})
	}
	return response.send({
            "status": 403,
            "message": "This is an ADMIN feature"
        });
}