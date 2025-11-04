import React, { useEffect } from "react";
import "./style/OutputPage.css";

function OutputPage() {
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const token = localStorage.getItem("token");

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
    <div className="output-page">
      <h1>Recipe</h1>
      <div className="recipe-card">
        <div className="recipe-columns">
          <div className="recipe-ingredients">
            <h2>Ingredients</h2>
            <p>{result.input_value}</p>
          </div>
          <div className="recipe-instructions">
            <h2>Instructions</h2>
            <ol>
              {result.instructions ? (
                result.output_value
                  .split("\n")
                  .map((step, i) => <li key={i}>{step}</li>)
              ) : (
                <li>No instructions available.</li>
              )}
            </ol>
          </div>
        </div>
        <p className="recipe-date">
          <em>{new Date(result.created_at).toLocaleString()}</em>
        </p>
      </div>
    </div>
  );
}

export default OutputPage;
