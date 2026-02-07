const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Get all products
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }
    res.json(rows);
  });
});

// Place order
app.post("/order", (req, res) => {
  const { product_id, quantity } = req.body;

  db.query(
    "INSERT INTO orders(product_id, quantity) VALUES (?, ?)",
    [product_id, quantity],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Order failed");
      }
      res.send("Order placed!");
    }
  );
});

app.listen(3000, () => console.log("Backend running on port 3000"));
