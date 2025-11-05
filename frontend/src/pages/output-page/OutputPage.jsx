import React, { useEffect } from "react";
import "./style/OutputPage.css";
import { useNavigate } from "react-router-dom";

function OutputPage() {
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/results/latest`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!result) return <div className="no-result">No result found.</div>;

  return (
    <div className="app-container output-page">
      {/* Navbar */}
      <nav className="nav-bar sticky-nav">
        <div className="nav-container">
          <div className="nav-title">AI Generator</div>
          <div className="nav-buttons">
            <button
              className="primary-btn gray-btn"
              onClick={() => navigate(-1)}>
              Back
            </button>
            <button
              className="primary-btn blue-btn"
              onClick={() => navigate("/")}>
              Home
            </button>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="main-content">
        <div className="content-container">
          <h1 className="main-title">Recipe</h1>

          <div className="recipe-card">
            <div className="recipe-ingredients">
              <h2>Your Ingredients</h2>
              <p>{result.input_value}</p>
            </div>

            <div className="recipe-instructions">
              <h2>Instructions</h2>
              <div className="instructions-text">
                {result.output_value || "No instructions available."}
              </div>
            </div>

            <p className="recipe-date">
              <em>{new Date(result.created_at).toLocaleString()}</em>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OutputPage;
