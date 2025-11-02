import React, {useEffect, useState}from "react";

function OutputPage() {
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    // Fetch userID from localStorage(Set by Login)
    const userID = localStorage.getItem("userID");

    useEffect(() => {
        if (!userID) {
            setError("User not logged in.");
            setLoading(false);
            return;
        }

        fetch(`http://localhost:5000/api/results/latest/${userID}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
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
    }, [userID]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!result) {
        return <div>No result found.</div>;
    }

  return (
    <div className="output-page">
      <h1>Recipe</h1>
      <div className="recipe-card">
        <p><strong>Input:</strong> {result.input_value}</p>
        <p><strong>Output:</strong> {result.output_value}</p>
        <p><em>{new Date(result.created_at).toLocaleString()}</em></p>
      </div>
    </div>
  );
}

export default OutputPage;