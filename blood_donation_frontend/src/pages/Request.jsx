import { useState } from "react";
import { Link } from "react-router-dom";
import { requestApi } from "../apis/apis";
import "../styles/Request.css";

export default function Request() {
  const [request, setRequest] = useState({
    bloodGroup: "",
    location: "",
    notes: "",
    neededByDate: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [urgencyLevel, setUrgencyLevel] = useState("normal");
  const email = sessionStorage.getItem("email");

  const handleChange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const handleUrgencyChange = (level) => {
    setUrgencyLevel(level);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!email) {
        alert("User not logged in!");
        return;
      }
      
      const requestData = { ...request, urgencyLevel };
      await requestApi(email, requestData);
      alert("Request submitted successfully!");
      setRequest({ bloodGroup: "", location: "", notes: "", neededByDate: "" });
      setUrgencyLevel("normal");
    } catch (err) {
      console.error(err);
      alert("Error submitting request");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUrgencyColor = () => {
    switch (urgencyLevel) {
      case "critical": return "#dc2626";
      case "urgent": return "#ea580c";
      default: return "#059669";
    }
  };

  return (
    <div className="request-container">
      {/* Header */}
      <div className="request-header">
        <Link to="/dashboard" className="back-button">
          <span className="back-icon">←</span>
          Back to Dashboard
        </Link>
        <div className="header-content">
          <div className="header-icon">🆘</div>
          <h1 className="page-title">Request Blood</h1>
          <p className="page-subtitle">Submit your blood request and connect with nearby donors</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="request-content">
        {/* Request Form */}
        <div className="form-section">
          <div className="form-wrapper">
            <div className="form-header">
              <h2>Blood Request Form</h2>
              <div className="urgency-indicator" style={{ backgroundColor: getUrgencyColor() }}>
                {urgencyLevel.toUpperCase()}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="request-form">
              {/* Blood Group Selection */}
              <div className="form-group blood-group-section">
                <label className="form-label">Required Blood Group</label>
                <div className="blood-group-grid">
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
                    <label key={type} className={`blood-type-card ${request.bloodGroup === type ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="bloodGroup"
                        value={type}
                        onChange={handleChange}
                        required
                      />
                      <span className="blood-type-label">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Urgency Level */}
              <div className="form-group urgency-section">
                <label className="form-label">Urgency Level</label>
                <div className="urgency-options">
                  <button
                    type="button"
                    onClick={() => handleUrgencyChange("normal")}
                    className={`urgency-btn normal ${urgencyLevel === "normal" ? "active" : ""}`}
                  >
                    <span className="urgency-icon">📅</span>
                    Normal
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUrgencyChange("urgent")}
                    className={`urgency-btn urgent ${urgencyLevel === "urgent" ? "active" : ""}`}
                  >
                    <span className="urgency-icon">⚠️</span>
                    Urgent
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUrgencyChange("critical")}
                    className={`urgency-btn critical ${urgencyLevel === "critical" ? "active" : ""}`}
                  >
                    <span className="urgency-icon">🚨</span>
                    Critical
                  </button>
                </div>
              </div>

              {/* Location and Date */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="location" className="form-label">
                    <span className="label-icon">📍</span>
                    Location/Hospital
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    placeholder="Enter hospital or area name"
                    value={request.location}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="neededByDate" className="form-label">
                    <span className="label-icon">⏰</span>
                    Needed By
                  </label>
                  <input
                    type="date"
                    name="neededByDate"
                    id="neededByDate"
                    value={request.neededByDate}
                    onChange={handleChange}
                    required
                    className="form-input"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div className="form-group">
                <label htmlFor="notes" className="form-label">
                  <span className="label-icon">📝</span>
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  id="notes"
                  placeholder="Provide any additional details about your request (patient condition, contact details, etc.)"
                  value={request.notes}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="4"
                />
              </div>

              {/* Submit Button */}
              <div className="form-actions">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`submit-button ${urgencyLevel} ${isSubmitting ? 'loading' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      <span className="submit-icon">📢</span>
                      Submit Blood Request
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Info Panel */}
        <div className="info-panel">
          <h3>Request Guidelines</h3>
          <div className="guidelines">
            <div className="guideline-item">
              <div className="guideline-icon">✅</div>
              <div>
                <h4>Be Specific</h4>
                <p>Provide exact location and contact details</p>
              </div>
            </div>
            <div className="guideline-item">
              <div className="guideline-icon">⏱️</div>
              <div>
                <h4>Set Realistic Timeline</h4>
                <p>Allow adequate time for donors to respond</p>
              </div>
            </div>
            <div className="guideline-item">
              <div className="guideline-icon">🔒</div>
              <div>
                <h4>Privacy Assured</h4>
                <p>Your information is kept confidential</p>
              </div>
            </div>
            <div className="guideline-item">
              <div className="guideline-icon">🤝</div>
              <div>
                <h4>Stay Connected</h4>
                <p>Respond promptly to donor inquiries</p>
              </div>
            </div>
          </div>

          <div className="emergency-banner">
            <div className="emergency-icon">🚨</div>
            <div className="emergency-content">
              <h4>Emergency?</h4>
              <p>For critical cases, also contact your local blood bank directly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}