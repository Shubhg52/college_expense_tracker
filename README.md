# 💸 College Expense Tracker

A dynamic and visually engaging web application that allows users to track their college expenses. Built with HTML, CSS, JavaScript, and Node.js, the app includes fun animations, interactive icons, and backend integration to save expenses in a local JSON file.

---

## 🚀 Features

- 🎨 **Animated UI** with triangle decorations, rotating circle, and floating icons
- 📦 **Add/Delete Expenses** with name, category, and amount
- 🍔 **Category-Based Icons** that bounce across the screen
- 🌀 **Rotating Circle** on the main box that changes appearance on click
- 💾 **Persistent Backend** using Node.js and JSON file
- 📊 **Total Expense Display** updated in real-time

---

## 🧰 Technologies Used

| Layer         | Stack                         |
|---------------|-------------------------------|
| Frontend      | HTML5, CSS3, JavaScript       |
| Animations    | GSAP (GreenSock Animation Platform) |
| Backend       | Node.js with Express.js       |
| Data Storage  | JSON File (`data.json`)       |
| Icons         | PNG images (stored locally)   |

---

## 📂 Folder Structure

📁 College-Expense-Tracker
├── 📁 frontend
│ ├── index.html
│ ├── style.css
│ ├── script.js
│ └── 📁 icons
│ ├── food.png
│ ├── rent.png
│ ├── books.png
│ ├── transport.png
│ ├── wifi.png
│ └── travel.png
├── 📁 backend
│ ├── server.js
│ └── data.json
└── 📁 docs_phase3
├── College_Expense_Tracker_Phase3_Abstract.pdf
└── screencast.mp4

---

## 🧪 Installation & Run Instructions

### Prerequisites
- Node.js is installed on your system

### 1️⃣ Start the Backend
```bash
cd backend
npm install express cors
node server.js
Backend will start on http://localhost:3000 and use data.json for saving expenses.

2️⃣ . Open the Frontend
Just open frontend/index.html in your browser. It will connect to the backend automatically via the fetch API.

🧪 Example Test Cases
Action	Expected Result
Add "Burger" in Food	Icon 🍔 floats, appears in list
Add "Books" in Books	Icon 📚 floats, expense shown
Click Delete (🗑️). Item removed, icon disappears
Refresh Page: All previous expenses reloaded from JSON

🎥 Screencast
See the final working demo in the screencast video
(Also embedded in the last slide of the presentation.)
📃 License
This project was built for educational purposes under the IU Java Web Development course.
All media assets used are locally stored or generated for demonstration.

🙋 Author
Shubham Sharma
LinkedIn:www.linkedin.com/in/shubham-sharma-10b512375
GitHub:https://github.com/Shubhg52/college_expense_tracker
