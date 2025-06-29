

import db from "./db.js";

export function createUser (req, res) {
  if (!req.body) {
    return res.status(400).send({ message: "Request body cannot be empty!" });
  }

  const user = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.Email,
    city: req.body.city,
    phone: req.body.phoneNumber,
    password: req.body.password
  };

  db.query("INSERT INTO users SET ?", user, (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).send("Error registering user.");
    }


    res.send(`
      <h1>Hello ${user.first_name}! Welcome to the New Era Family,</h1>
      <h2>You've taken the first step toward sustainable baby fashion</h2>
      <h3>We're excited to have you with us.</h3>
    `);
  });
};

export function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Missing email or password.");
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).send("Server error during login.");
    }

    if (results.length === 0) {
      return res.status(401).send("User not found.");
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).send("Incorrect password.");
    }

    res.redirect("/Profile");
  });
}


export function getAllUsers (req, res) {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving users: " + err);
      return;
    }
    res.send(result);
  });
};

export function getAllProducts(req, res) {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).send("Error fetching products from database.");
      return;
    }
    res.json(result); 
  });
}


export function findUserByEmail(req, res) {
  const email = req.query.email;
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.status(500).send("Error finding user: " + err);
      return;
    }
    res.send(result);
  });
};


export function addToCart(req, res) {
  const { user_email, product_id } = req.body;

  const sql = "INSERT INTO cart (user_email, product_id) VALUES (?, ?)";
  db.query(sql, [user_email, product_id], (err, result) => {
    if (err) {
      console.error("Error adding to cart:", err);
      return res.status(500).send("Failed to add product to cart.");
    }
    res.send("Product added to cart successfully.");
  });
}

export function getCartByEmail(req, res) {
  const email = req.query.email;
  if (!email) return res.status(400).send("Missing email");

  db.query(
    `SELECT products.id, products.name, products.description, products.price, products.image_url
     FROM cart
     JOIN products ON cart.product_id = products.id
     WHERE cart.user_email = ?`,
    [email],
    (err, result) => {
      if (err) {
        console.error("Error fetching cart:", err);
        return res.status(500).send("Error fetching cart");
      }
      res.json(result);
    }
  );
}

export function removeFromCart(req, res) {
  const { user_email, product_id } = req.body;

  if (!user_email || !product_id) {
    console.log("Missing user_email or product_id");
    return res.status(400).send("Missing user_email or product_id");
  }

  const query = "DELETE FROM cart WHERE user_email = ? AND product_id = ?";
  db.query(query, [user_email, product_id], (err, result) => {
    if (err) {
      console.error("Error removing from cart:", err);
      return res.status(500).send("Error removing from cart");
    }
    res.send("Item removed from cart successfully");
  });
}








