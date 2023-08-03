const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController.js");

// Create
router.post("/addProduct", productController.addProduct);
// Read
router.get("/getListed", productController.getListedProducts);
router.get("/getAllProducts", productController.getAllProducts);
router.get("/product/:productId", productController.getProductInfo);
// Update
router.patch("/updateInfo/:productId", productController.updateProductInfo);
router.patch("/unlist/:productId", productController.unlistProduct);
router.patch("/list/:productId", productController.listProduct);
// Delete
router.delete("/delete/:productId", productController.deleteProduct);

module.exports = router;