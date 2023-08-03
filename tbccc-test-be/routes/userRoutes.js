const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController.js");

// Create
router.post("/signup", userController.signUp);
router.post("/checkUsername", userController.checkIfUsernameExists);
router.post("/checkEmail", userController.checkIfEmailExists);
// Read
router.get("/getAll", userController.getAllUsers);
router.get("/getInfo", userController.getUserInfo);
// Update
router.patch("/updateInfo", userController.updateUserInfo);
router.patch("/changePass", userController.changeUserPassword);
// Delete
router.delete("/deleteUser", userController.deleteUserAccount);
router.delete("/adminDeleteUser", userController.adminDeleteAccount);

// Login
router.post("/logIn", userController.logIn);

// Cart Endpoint
router.post("cart/add", userController.addToCart);
router.patch("cart/updateItemQty", userController.updateProductCartQuantity);
router.patch("cart/removeItem", userController.removeFromCart);
router.get("cart/getSubtotal/:productId", userController.getItemSubtotal);
router.get("cart/getTotal", userController.getCartTotal);

module.exports = router;