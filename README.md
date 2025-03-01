# Stock-market-dashboard
📌 Overview

This is a Stock Market Dashboard built using HTML, CSS, JavaScript (Chart.js) for the frontend and Flask (Python) as the backend. The dashboard allows users to view stock trends for different companies.

🚀 Features

📌 Company List (Left Side) – Click on a company to view its stock data.

📊 Stock Price Chart (Right Side) – Displays historical stock prices.

🌙 Dark Mode Toggle – Switch between light and dark themes.

🔄 Auto-Refreshing Stock Prices – Updates every 10 seconds.

📱 Mobile Responsive – Works on all screen sizes.

🔍 Search Bar – Easily find companies.

⚠ No Data Message – Informs users when data is unavailable.

🛠️ Installation & Setup

1️⃣ Clone the Repository

 git clone https://github.com/YOUR_USERNAME/Stock-market-dashboard.git
 cd Stock-market-dashboard

2️⃣ Setup Backend (Flask API)

Install Python & Virtual Environment

 python -m venv venv
 source venv/bin/activate  # On Windows: venv\Scripts\activate
 pip install -r requirements.txt

Run the Flask Backend

 cd backend
 python app.py

🔹 The backend should now be running at http://127.0.0.1:5000

3️⃣ Run the Frontend

Using Python Server

 cd frontend
 python -m http.server 8000

🔹 Open http://127.0.0.1:8000 in your browser.

Using VS Code Live Server

Open the project in VS Code.

Install the Live Server Extension.

Right-click index.html → Click "Open with Live Server".

4️⃣ Deploy to GitHub Pages

Push your code to GitHub.

Go to Settings → Pages.

Under Branch, select main and click Save.

Your site will be live at:

https://YOUR_USERNAME.github.io/Stock-market-dashboard/

⚠ Troubleshooting

If git push fails, try git pull origin main --rebase first.

If Flask shows File Not Found, ensure dump.csv is in the correct location.

Use the browser console (F12 → Console) to debug frontend errors.

✨ Contributing

Want to improve this project? Feel free to fork and submit a pull request!

📜 License

This project is open-source and available under the MIT License.
