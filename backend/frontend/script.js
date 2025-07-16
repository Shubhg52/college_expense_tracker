document.getElementById("expense-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const desc = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  if (!desc || isNaN(amount) || amount <= 0) return;

  const expense = { desc, amount, category };

  await fetch("http://localhost:3000/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense)
  });

  document.getElementById("expense-form").reset();
  loadExpenses();
});

async function loadExpenses() {
  const res = await fetch("http://localhost:3000/expenses");
  const expenses = await res.json();

  const list = document.getElementById("expense-list");
  list.innerHTML = "";
  let total = 0;

  expenses.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.desc} - $${item.amount} (${item.category})
      <button class="delete-btn" data-index="${index}" title="Delete">&#128465;</button>
    `;
    list.appendChild(li);
    total += Number(item.amount);
  });

  document.getElementById("total").textContent = `Total: $${total}`;

  // Delete buttons
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const index = btn.dataset.index;
      await fetch(`http://localhost:3000/expenses/${index}`, {
        method: "DELETE"
      });
      loadExpenses();
    });
  });
}

loadExpenses();
