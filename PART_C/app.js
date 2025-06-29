import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import db from "./db.js";
import {
  createUser,
  loginUser,
  getAllProducts,
  addToCart,
  getCartByEmail,
  removeFromCart
} from "./CRUD_functions.js";

const _dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
const port = 8080;
var firstName = "";

// מחובר למסד נתונים דרך db.js
const connection = db;

// מחשב סכום כולל של הסל לפי אימייל
app.get("/api/cart/total", (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).send("Email is required");

  const query = `
    SELECT SUM(p.price * c.quantity) AS total
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_email = ?
  `;
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error calculating total:", err);
      return res.status(500).send("Error calculating total");
    }
    res.json({ total: results[0].total ?? 0 });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.static(path.join(_dirname, "../PART_B")));
app.use(bodyParser.urlencoded({ extended: true }));

// עמוד הבית
app.get("/", (req, res) => {
  res.sendFile(path.join(_dirname, "../PART_B/Home.html"));
});

// שאר הדפים
app.get("/AboutUs", (req, res) => {
  res.sendFile(path.join(_dirname, "../PART_B/AboutUs.html"));
});

app.get("/Products", (req, res) => {
  res.sendFile(path.join(_dirname, "../PART_B/Products.html"));
});

app.get("/Cart", (req, res) => {
  res.sendFile(path.join(_dirname, "../PART_B/Cart.html"));
});

app.post("/cart", (req, res) => {
  const { cartSummary } = req.body;
  console.log("Cart saved:", cartSummary);
  res.send(`<h2>Your cart was saved successfully!</h2><p>${cartSummary}</p>`);
});

app.get("/ContactUS", (req, res) => {
  res.sendFile(path.join(_dirname, "../PART_B/ContactUS.html"));
});

app.get("/Login", (req, res) => {
  res.sendFile(path.join(_dirname, "../PART_B/Login.html"));
});

app.get("/Profile", (req, res) => {
  res.sendFile(path.join(_dirname, "../PART_B/Profile.html"));
});

app.get("/ForgetPassword", (req, res) => {
  res.sendFile(path.join(_dirname, "../PART_B/ForgetPassword.html"));
});

app.get("/PrivacyPolicy", (req, res) => {
  res.sendFile(path.join(_dirname, "../PART_B/PrivacyPolicy.html"));
});

app.get("/TermsOfService", (req, res) => {
  res.sendFile(path.join(_dirname, "../PART_B/TermsOfService.html"));
});

// API Routes
app.post("/singup", createUser);
app.post("/login", loginUser);
app.get("/api/products", getAllProducts);
app.post("/api/cart", addToCart);
app.get("/api/cart", getCartByEmail);
app.post("/api/cart/remove", removeFromCart);

// דף 404
app.use((req, res) => {
  res.status(404).send("Sorry, page not found");
});
