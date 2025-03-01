document.addEventListener("DOMContentLoaded", function () {
    console.log("Fetching company list...");

    fetch("http://127.0.0.1:5000/companies")
        .then(response => response.json())
        .then(companies => {
            console.log("Received Companies:", companies);
            
            let companyList = document.getElementById("company-list");
            companyList.innerHTML = "";

            companies.forEach(company => {
                let li = document.createElement("li");
                li.textContent = company;
                li.classList.add("list-group-item");
                li.onclick = () => loadCompanyData(company);
                companyList.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching companies:", error));
});

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Load stock data when a company is clicked
function loadCompanyData(company) {
    if (!company) return;

    console.log(`Fetching data for: ${company}`);

    fetch(`http://127.0.0.1:5000/company/${encodeURIComponent(company)}`)
        .then(response => response.json())
        .then(data => {
            console.log("Received Data:", data);

            if (data.error || !data.dates || data.dates.length === 0) {
                alert("⚠ No data found for this stock. Try another company.");
                return;
            }

            renderChart(company, data.dates, data.prices);
        })
        .catch(error => console.error("Error fetching company data:", error));
}

// Render the stock chart with live updates
function renderChart(company, labels, data) {
    let ctx = document.getElementById("stockChart").getContext("2d");

    if (window.stockChartInstance) {
        window.stockChartInstance.destroy();
    }

    window.stockChartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: company + " Stock Price",
                data: data,
                borderColor: "blue",
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000, // Smooth animation for stock updates
                easing: 'easeInOutQuad'
            }
        }
    });

    // Auto-update stock prices every 10 seconds
    clearInterval(window.stockUpdateInterval); // Clear previous interval
    window.stockUpdateInterval = setInterval(() => {
        loadCompanyData(company);
    }, 10000);
}

// Search bar functionality
function filterCompanies() {
    let searchInput = document.getElementById("search-bar").value.toLowerCase();
    let items = document.querySelectorAll("#company-list li");

    items.forEach(item => {
        let text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchInput) ? "block" : "none";
    });
}

// Ensure mobile responsiveness
window.addEventListener("resize", function () {
    let container = document.querySelector(".container");
    if (window.innerWidth < 768) {
        container.style.flexDirection = "column";
    } else {
        container.style.flexDirection = "row";
    }
});
