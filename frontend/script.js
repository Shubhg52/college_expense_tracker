const form = document.getElementById("expense-form");
const description = document.getElementById("description");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const expenseList = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");
const circle = document.getElementById("circle");
const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

let expenses = [];

// ✅ Icon creation with animation
function createIcon(category, id) {
  const img = document.createElement("img");
  img.src = `icons/${category}.png`;
  img.classList.add("expense-icon");
  img.style.position = "absolute";
  img.style.top = `${Math.random() * 80 + 10}%`;
  img.style.left = `${Math.random() * 80 + 10}%`;
  img.id = `icon-${id}`;
  img.style.zIndex = 0;
  document.body.appendChild(img);

  let dx = (Math.random() - 0.5) * 0.5;
  let dy = (Math.random() - 0.5) * 0.5;

  function animate() {
    let top = parseFloat(img.style.top);
    let left = parseFloat(img.style.left);

    top += dy;
    left += dx;

    if (top <= 0 || top >= 90) dy *= -1;
    if (left <= 0 || left >= 90) dx *= -1;

    img.style.top = `${top}%`;
    img.style.left = `${left}%`;

    img._animationFrame = requestAnimationFrame(animate);
  }

  animate();
}

function removeIcon(id) {
  const icon = document.getElementById(`icon-${id}`);
  if (icon) {
    cancelAnimationFrame(icon._animationFrame);
    icon.remove();
  }
}

// ✅ Render Expense
function renderExpense(expense) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span><strong>${expense.category}</strong>: ${expense.description} - €${parseFloat(expense.amount).toFixed(2)} <small>${expense.date}</small></span>
    <button class="delete-btn" data-id="${expense.id}">🗑️</button>
  `;
  expenseList.appendChild(li);
  createIcon(expense.category, expense.id);
}

function updateTotalDisplay() {
  const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  totalDisplay.innerText = `Total: €${total.toFixed(2)}`;
}

// ✅ Form Submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newExpense = {
    description: description.value,
    category: category.value,
    amount: parseFloat(amount.value),
    date: new Date().toISOString().split("T")[0]
  };

  const res = await fetch("http://localhost:3000/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newExpense)
  });

  if (res.ok) {
    const saved = await res.json();
    expenses.push(saved);
    renderExpense(saved);
    updateTotalDisplay();
    form.reset();
  }
});

// ✅ Delete Expense
// ✅ Delete Expense (Fixed for icon inside button)
expenseList.addEventListener("click", async (e) => {
  const btn = e.target.closest(".delete-btn");
  if (btn) {
    const id = btn.dataset.id;
    const res = await fetch(`http://localhost:3000/expenses/${id}`, {
      method: "DELETE"
    });
    if (res.ok) {
      btn.parentElement.remove();
      expenses = expenses.filter(exp => exp.id !== id);
      removeIcon(id);
      updateTotalDisplay();
    }
  }
});


window.onload = async () => {
  try {
    const res = await fetch("http://localhost:3000/expenses");
    const data = await res.json();
    expenses = data || [];
    expenseList.innerHTML = "";
    expenses.forEach(renderExpense);
    updateTotalDisplay();
  } catch (err) {
    console.error("Failed to fetch expenses on load:", err);
  }
};


// 🔄 Circle animation toggle
document.getElementById('circle').addEventListener('click', function () {
  this.classList.toggle('circle-clicked');
});


// 🔺 GSAP Triangle Animation
gsap.to(".pair1", {
  scale: 1.1,
  yoyo: true,
  repeat: -1,
  duration: 1.5,
  transformOrigin: "top left",
  ease: "power1.inOut"
});
gsap.to(".pair2", {
  scale: 0.9,
  yoyo: true,
  repeat: -1,
  duration: 1.5,
  transformOrigin: "top left",
  ease: "power1.inOut"
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");

  // Toggle icon
  if (document.body.classList.contains("dark-mode")) {
    themeIcon.src = "icons/sun.png";  // You should have this icon ready too
  } else {
    themeIcon.src = "icons/moon.png";
  }
});
