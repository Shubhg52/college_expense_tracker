const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "data.json");

app.use(cors());
app.use(express.json());

function readExpenses(callback) {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      console.error("❌ Error reading file:", err);
      return callback([]);
    }
    try {
      const expenses = data.trim() === "" ? [] : JSON.parse(data);
      callback(expenses);
    } catch (e) {
      console.error("❌ Corrupt JSON, starting fresh");
      callback([]);
    }
  });
}

// GET
app.get("/expenses", (req, res) => {
  readExpenses((expenses) => res.json(expenses));
});

// POST
app.post("/expenses", (req, res) => {
  const newExpense = req.body;

  if (!newExpense || !newExpense.amount || !newExpense.desc || !newExpense.category) {
    return res.status(400).json({ error: "Invalid expense format" });
  }

  readExpenses((expenses) => {
    expenses.push(newExpense);
    fs.writeFile(DATA_FILE, JSON.stringify(expenses, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to save" });
      res.status(201).json({ message: "Expense saved" });
    });
  });
});

// DELETE
app.delete("/expenses/:index", (req, res) => {
  const index = parseInt(req.params.index);

  readExpenses((expenses) => {
    if (index < 0 || index >= expenses.length) {
      return res.status(400).json({ error: "Invalid index" });
    }

    expenses.splice(index, 1);
    fs.writeFile(DATA_FILE, JSON.stringify(expenses, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to delete" });
      res.status(200).json({ message: "Deleted" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
