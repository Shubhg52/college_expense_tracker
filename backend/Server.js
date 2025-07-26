const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

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

function writeExpenses(expenses, callback) {
  fs.writeFile(DATA_FILE, JSON.stringify(expenses, null, 2), (err) => {
    if (err) {
      console.error("❌ Failed to write file:", err);
      return callback(false);
    }
    callback(true);
  });
}

// ✅ GET all expenses
app.get("/expenses", (req, res) => {
  readExpenses((expenses) => res.json(expenses));
});

// ✅ POST a new expense
app.post("/expenses", (req, res) => {
  const newExpense = req.body;

  if (!newExpense.amount || !newExpense.description || !newExpense.category) {
    return res.status(400).json({ error: "Invalid expense format" });
  }

  newExpense.id = uuidv4(); // Assign unique ID

  readExpenses((expenses) => {
    expenses.push(newExpense);
    writeExpenses(expenses, (success) => {
      if (!success) return res.status(500).json({ error: "Failed to save" });
      res.status(201).json(newExpense); // Return saved expense with ID
    });
  });
});

// ✅ DELETE expense by ID
app.delete("/expenses/:id", (req, res) => {
  const id = req.params.id;

  readExpenses((expenses) => {
    const updated = expenses.filter(exp => exp.id !== id);
    if (updated.length === expenses.length) {
      return res.status(404).json({ error: "Expense not found" });
    }

    writeExpenses(updated, (success) => {
      if (!success) return res.status(500).json({ error: "Failed to delete" });
      res.status(200).json({ message: "Deleted" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
