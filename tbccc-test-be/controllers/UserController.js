const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const auth = require("../auth.js");

module.exports.signUp = async (request, response) => {
    let newUser = new User({
        name: request.body.firstName,
        username: request.body.lastName,
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