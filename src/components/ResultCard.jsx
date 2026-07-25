function ResultCard({ client, index }) {
  return (
    <div className="result-card">
      <span className="eyebrow">Lead {String(index + 1).padStart(2, "0")}</span>
      <h3>{client.businessName}</h3>

      <div className="field-row">
        <span className="k">City</span>
        <span>{client.city}</span>
      </div>

      <div className="field-row">
        <span className="k">Phone</span>
        <span>{client.phone}</span>
      </div>

      <div className="field-row">
        <span className="k">Website</span>
        <span>{client.website}</span>
      </div>

      <div className="reason">
        <span className="k">Why this lead</span>
        {client.reason}
      </div>
    </div>
  );
}

export default ResultCard;