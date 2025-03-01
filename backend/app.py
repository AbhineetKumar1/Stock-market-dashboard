from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # ✅ This allows the frontend to call the backend

# Load dataset once and clean it
df = pd.read_csv("dump.csv")
df["index_name"] = df["index_name"].str.strip()  # Remove extra spaces

# ✅ FIX: Convert date format correctly
df["index_date"] = pd.to_datetime(df["index_date"], format="%d-%m-%Y", errors="coerce")

@app.route("/")
def home():
    return "Flask API is running!"

@app.route("/companies", methods=["GET"])
def get_companies():
    """Return unique company (index) names"""
    companies = df["index_name"].unique().tolist()
    return jsonify(companies)
@app.route("/debug-companies", methods=["GET"])
def debug_companies():
    """Return all available company names for debugging"""
    return jsonify(df["index_name"].unique().tolist())

@app.route("/company/<string:name>", methods=["GET"])
def get_company_data(name):
    """Return stock data for a specific company, with optional date filters"""
    name = name.strip()
    company_df = df[df["index_name"] == name]

    if company_df.empty:
        return jsonify({"error": "Company not found"}), 404

    # Optional date filters
    start_date = request.args.get("start")
    end_date = request.args.get("end")

    if start_date:
        start_date = pd.to_datetime(start_date, format="%Y-%m-%d", errors="coerce")
        company_df = company_df[company_df["index_date"] >= start_date]

    if end_date:
        end_date = pd.to_datetime(end_date, format="%Y-%m-%d", errors="coerce")
        company_df = company_df[company_df["index_date"] <= end_date]

    return jsonify({
        "dates": company_df["index_date"].dt.strftime('%Y-%m-%d').tolist(),
        "prices": company_df["closing_index_value"].tolist()
    })

if __name__ == "__main__":
    print("✅ API Running on http://127.0.0.1:5000/")
    app.run(debug=True)
