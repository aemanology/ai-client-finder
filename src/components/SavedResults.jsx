function SavedResults({ savedLeads, onRemove }) {
  if (savedLeads.length === 0) {
    return (
      <div className="results">
        <p className="helper">No saved leads yet. Search, then hit "Save leads" to keep some here.</p>
      </div>
    );
  }

  return (
    <div className="results">
      <div className="results-head">
        <div>
          <h2>Saved leads</h2>
          <span className="results-count">{savedLeads.length} saved</span>
        </div>
      </div>

      <div className="result-list">
        {savedLeads.map((client, index) => (
          <div className="result-card" key={client.businessName + index}>
            <div className="card-top">
              <span className="eyebrow">Lead {String(index + 1).padStart(2, "0")}</span>
              <button className="remove-btn" onClick={() => onRemove(client)}>Remove</button>
            </div>
            <h3>{client.businessName}</h3>

            <div className="field-row">
              <span className="k">City</span>
              <span>{client.city}</span>
            </div>

            <div className="field-row">
  <span className="k">Phone</span>
  <span>{client.phone || "Not listed"}</span>
</div>

<div className="field-row">
  <span className="k">Website</span>
  <span>{client.website || "No website"}</span>
</div>

            <div className="reason">
              <span className="k">Why this lead</span>
              {client.reason}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedResults;
