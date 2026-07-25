import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import axios from "axios";
import ResultCard from "./components/ResultCard";
import SavedResults from "./components/SavedResults";

function App() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedLeads, setSavedLeads] = useState([]);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("savedResults");
    if (stored) setSavedLeads(JSON.parse(stored));
  }, []);

  const saveResults = () => {
    const existingKeys = new Set(savedLeads.map((l) => l.email + l.businessName));
    const newOnes = results.filter((r) => !existingKeys.has(r.email + r.businessName));
    const updated = [...savedLeads, ...newOnes];
    setSavedLeads(updated);
    localStorage.setItem("savedResults", JSON.stringify(updated));
    alert(newOnes.length > 0 ? `Saved ${newOnes.length} new lead(s).` : "Already saved.");
  };

  const removeSaved = (client) => {
    const updated = savedLeads.filter(
      (l) => !(l.email === client.email && l.businessName === client.businessName)
    );
    setSavedLeads(updated);
    localStorage.setItem("savedResults", JSON.stringify(updated));
  };

  const handleSearch = async (businessType, city) => {
    setIsLoading(true);
    setShowSaved(false);
    try {
     const response = await axios.post("/api/find-clients", {
        businessType,
        city,
      });

      console.log(response.data);
      setResults(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <Header />
      <SearchForm onSearch={handleSearch} isLoading={isLoading} />

      <div className="toggle-row">
        <button className="save-btn" onClick={() => setShowSaved(!showSaved)}>
          {showSaved ? "Back to search" : `View saved (${savedLeads.length})`}
        </button>
      </div>

      {showSaved ? (
        <SavedResults savedLeads={savedLeads} onRemove={removeSaved} />
      ) : (
        results.length > 0 && (
          <div className="results">
            <div className="results-head">
              <div>
                <h2>Potential clients</h2>
                <span className="results-count">{results.length} leads found</span>
              </div>
              <button className="save-btn" onClick={saveResults}>Save leads</button>
            </div>

            <div className="result-list">
              {results.map((client, index) => (
                <ResultCard key={index} client={client} index={index} />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default App;