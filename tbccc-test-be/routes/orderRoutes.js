const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController.js");
const auth = require("../auth.js");

router.get("/order", auth.verify, orderController.order);
router.get("/getAllOrders", orderController.getAllOrders);
router.get("/getOrders", orderController.getUserOrders);
router.delete("/cancel/:orderId", orderController.cancelOrder);

module.exports = router;
