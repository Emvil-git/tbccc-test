// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Route imports
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");

// Set Up Express
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Set up routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);

// Connect to MongoDB
mongoose.connect("mongodb+srv://admin:admin@batch230.cqzdm3c.mongodb.net/tbccc-test-be?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once("open", () => console.log("Now Connected to MongoDB"));

app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${process.env.PORT || 4000}`)
});