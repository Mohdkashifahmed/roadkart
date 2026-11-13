const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
 
const app = express();
 
// Middleware
app.use(cors());                                  // lets Angular (port 4200) talk to this server (port 3000)
app.use(express.json());                          // reads JSON data sent by Angular into req.body
app.use(express.urlencoded({ extended: true }));  // reads normal form data into req.body
 
// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/roadkart")
  .then(() => console.log("MongoDB connected"))
  .catch(() => console.log("MongoDB is not running. Start it first."));
 
// ---------- Models (what we store in MongoDB) ----------
const productSchema = new mongoose.Schema({
  name: String,
  seller: String,
  price: Number,
  category: String
});
const Product = mongoose.model("Product", productSchema);
 
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model("User", userSchema);
 
const orderSchema = new mongoose.Schema({
  userEmail: String,
  address: String,
  phone: String,
  items: Array,
  total: Number,
  date: String,
  status: String
});
const Order = mongoose.model("Order", orderSchema);
 
// ---------- Routes ----------
 
// Product Catalog: get all products
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});
 
// User Login: register
app.post("/register", async (req, res) => {
  const oldUser = await User.findOne({ email: req.body.email });
 
  if (oldUser) {
    res.status(400).json({ message: "This email is already registered" });
    return;
  }
 
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  await user.save();
  res.json({ message: "Registered successfully" });
});
 
// User Login: login (the admin is a fixed account)
app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
 
  if (email === "admin@roadkart.com" && password === "admin123") {
    res.json({ name: "Admin", email: email, isAdmin: true });
    return;
  }
 
  const user = await User.findOne({ email: email, password: password });
 
  if (!user) {
    res.status(401).json({ message: "Wrong email or password" });
    return;
  }
 
  res.json({ name: user.name, email: user.email, isAdmin: false });
});
 
// Checkout: place an order
app.post("/orders", async (req, res) => {
  const order = new Order({
    userEmail: req.body.userEmail,
    address: req.body.address,
    phone: req.body.phone,
    items: req.body.items,
    total: req.body.total,
    date: req.body.date,
    status: "Placed"
  });
  await order.save();
  res.json({ message: "Order placed" });
});
 
// Orders: get the orders of one user  (example: /orders?email=abc@gmail.com)
app.get("/orders", async (req, res) => {
  const orders = await Order.find({ userEmail: req.query.email });
  res.json(orders);
});
 
// Admin: add a product
app.post("/products", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    seller: req.body.seller,
    price: req.body.price,
    category: req.body.category
  });
  await product.save();
  res.json({ message: "Product added" });
});
 
// Admin: delete a product
app.post("/products/delete", async (req, res) => {
  await Product.deleteOne({ _id: req.body.id });
  res.json({ message: "Product deleted" });
});
 
// Admin: get all orders
app.get("/orders/all", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});
 
// ---------- Start the server ----------
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
 