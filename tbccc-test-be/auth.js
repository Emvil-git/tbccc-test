const jwt = require("jsonwebtoken");
const secret = "TBCCCTest";

module.exports.createAccessToken = (user) => {
    const data = {
        id:user._id,
        isAdmin: user.isAdmin,
    }

    return jwt.sign(data, secret, {});
}

module.exports.verify = (request, response, next) => {
    let token = request.headers.authorisation
    if(typeof token !== "undefined"){ 
        console.log(token);
        token=token.slice(7, token.length);
        return jwt.verify(token, secret, (error, data) =>{
			if(error){
				return response.send({
					auth: "Failed. "
				});
			}
			else{
				next();
			}
		})
    }
}

module.exports.decode = (token) => {
	if(typeof token !== "undefined"){
		token = token.slice(7, token.length);
	}
	return jwt.verify(token, secret, (error, data) => {
		if(error){
			return null;
		}
		else{
			return jwt.decode(token, {complete:true}).payload;
		}
	})
}