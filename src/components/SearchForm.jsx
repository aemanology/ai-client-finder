import { useState } from "react";

function SearchForm({ onSearch, isLoading }) {
  const [businessType, setBusinessType] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!businessType.trim() || !city.trim()) return;
    onSearch(businessType, city);
  };

  return (
    <div className="console">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="businessType">Business Category</label>
          <input
            id="businessType"
            type="text"
            placeholder="e.g. Restaurants, Hospitals, Dentists"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            placeholder="e.g. Islamabad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <button type="submit" className={isLoading ? "scanning" : ""} disabled={isLoading}>
          {isLoading ? "Scanning…" : "Find clients"}
        </button>
      </form>
      <p className="helper">Takes about 10 seconds. Results are ranked by fit, not just proximity.</p>
    </div>
  );
}

export default SearchForm;
