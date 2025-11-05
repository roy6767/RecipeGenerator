import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Loader2, Copy, Check } from "lucide-react";
import apiService from "../../services/api";

const GeneratePage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/auth");
      return;
    }
  }, [navigate]);

  const parseIngredients = (text) =>
    text
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

  const handleGenerate = async () => {
    const ingredients = parseIngredients(prompt);
    if (ingredients.length === 0) {
      setError("Please enter at least one ingredient.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult("");
      const response = await apiService.generate.create(ingredients);
      navigate("/Output");
      // Axios response shape: response.data
      const data = response.data;
      if (data && data.recipe) {
        setResult(data.recipe);
      } else if (data && data.message) {
        setError(data.message);
      } else {
        setError("Unexpected response from server.");
      }
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to generate recipe.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (_) {
      // noop
    }
  };

  return (
    <div
      className="app-container"
      style={{ backgroundColor: "#0b1220", color: "#e5e7eb" }}>
      <nav className="nav-bar sticky-nav">
        <div
          className="nav-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <div style={{ fontWeight: 700 }}>AI Generator</div>
          <button
            className="primary-btn blue-btn"
            onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      </nav>

      <main className="main-content">
        <div className="content-container" style={{ maxWidth: "56rem" }}>
          <h1 className="main-title" style={{ marginBottom: "0.5rem" }}>
            Google's AI Gemini
          </h1>
          <p
            style={{
              color: "#9ca3af",
              textAlign: "center",
              marginBottom: "1.5rem",
            }}>
            Enter ingredients separated by commas. We'll craft a recipe for you.
          </p>

          <div
            style={{
              background: "#111827",
              border: "1px solid #1f2937",
              borderRadius: "0.75rem",
              padding: "1rem",
            }}>
            <label
              htmlFor="ingredients"
              style={{
                display: "block",
                color: "#9ca3af",
                marginBottom: "0.5rem",
              }}>
              Ingredients
            </label>
            <textarea
              id="ingredients"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., chicken, rice, garlic, onion, soy sauce"
              rows={5}
              style={{
                width: "100%",
                background: "#0b1220",
                color: "#e5e7eb",
                borderRadius: "0.5rem",
                border: "1px solid #1f2937",
                padding: "0.75rem",
                resize: "vertical",
                outline: "none",
              }}
            />

            {error && (
              <div style={{ color: "#f87171", marginTop: "0.5rem" }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
              <button
                className="primary-btn green-btn"
                disabled={loading}
                onClick={handleGenerate}
                style={{ opacity: loading ? 0.8 : 1 }}>
                {loading ? (
                  <Loader2 size={18} className="spin" />
                ) : (
                  <Sparkles size={18} />
                )}
                {loading ? "Generating..." : "Generate Recipe"}
              </button>

              {result && (
                <button
                  className="primary-btn"
                  onClick={handleCopy}
                  style={{ background: "#374151" }}>
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              )}
            </div>
          </div>

          {result && (
            <div
              style={{
                marginTop: "1rem",
                background: "#0f172a",
                border: "1px solid #1f2937",
                borderRadius: "0.75rem",
                padding: "1rem",
              }}>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  margin: 0,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                }}>
                {result}
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GeneratePage;
