import { useState } from "react";
import "../styles/BloodCompatibility.css";

export default function BloodCompatibility() {
  const [selectedGroup, setSelectedGroup] = useState("");

  // Compatibility data
  const bloodCompatibility = {
    "A+": { take: ["O+", "O-", "A+", "A-"], give: ["A+", "AB+"] },
    "A-": { take: ["O-", "A-"], give: ["A-", "A+", "AB-", "AB+"] },
    "B+": { take: ["O+", "O-", "B+", "B-"], give: ["B+", "AB+"] },
    "B-": { take: ["O-", "B-"], give: ["B-", "B+", "AB-", "AB+"] },
    "AB+": { take: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"], give: ["AB+"] },
    "AB-": { take: ["O-", "A-", "B-", "AB-"], give: ["AB-", "AB+"] },
    "O+": { take: ["O+", "O-"], give: ["O+", "A+", "B+", "AB+"] },
    "O-": { take: ["O-"], give: ["Everyone (Universal Donor)"] },
  };

  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      'A+': '#ef4444', 'A-': '#f97316',
      'B+': '#eab308', 'B-': '#84cc16',
      'O+': '#10b981', 'O-': '#06b6d4',
      'AB+': '#8b5cf6', 'AB-': '#ec4899'
    };
    return colors[bloodGroup] || '#dc2626';
  };

  const getCompatibilityFacts = (bloodGroup) => {
    const facts = {
      "A+": {
        title: "A+ Blood Type",
        description: "Found in about 34% of the population",
        specialNote: "Can help save lives of A+ and AB+ recipients"
      },
      "A-": {
        title: "A- Blood Type", 
        description: "Found in about 6% of the population",
        specialNote: "Rare type that can help 4 different blood groups"
      },
      "B+": {
        title: "B+ Blood Type",
        description: "Found in about 9% of the population", 
        specialNote: "Essential for B+ and AB+ patients"
      },
      "B-": {
        title: "B- Blood Type",
        description: "Found in about 2% of the population",
        specialNote: "Rare and valuable for multiple recipients"
      },
      "AB+": {
        title: "AB+ Blood Type",
        description: "Found in about 3% of the population",
        specialNote: "Universal recipient - can receive from anyone!"
      },
      "AB-": {
        title: "AB- Blood Type", 
        description: "Found in less than 1% of the population",
        specialNote: "Extremely rare and can help AB recipients"
      },
      "O+": {
        title: "O+ Blood Type",
        description: "Found in about 38% of the population", 
        specialNote: "Most common type, always in high demand"
      },
      "O-": {
        title: "O- Blood Type",
        description: "Found in about 7% of the population",
        specialNote: "Universal donor - can help save anyone's life!"
      }
    };
    return facts[bloodGroup] || {};
  };

  return (
    <div className="compatibility-container">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">🧬</span>
            Blood Compatibility Guide
          </h1>
          <p className="page-subtitle">Learn about blood donation compatibility and save lives</p>
        </div>
      </div>

      {/* Blood Group Selection */}
      <div className="selection-section">
        <h2 className="selection-title">Select Your Blood Group</h2>
        <div className="blood-group-grid">
          {Object.keys(bloodCompatibility).map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`blood-group-btn ${selectedGroup === group ? 'selected' : ''}`}
              style={{
                '--group-color': getBloodGroupColor(group),
                backgroundColor: selectedGroup === group ? getBloodGroupColor(group) : 'white'
              }}
            >
              <span className="group-text">{group}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Compatibility Information */}
      {selectedGroup && (
        <div className="compatibility-info">
          <div className="info-card main-card">
            <div className="card-header">
              <div className="blood-type-display">
                <span 
                  className="blood-type-badge"
                  style={{ backgroundColor: getBloodGroupColor(selectedGroup) }}
                >
                  {selectedGroup}
                </span>
                <div className="blood-type-details">
                  <h3>{getCompatibilityFacts(selectedGroup).title}</h3>
                  <p>{getCompatibilityFacts(selectedGroup).description}</p>
                </div>
              </div>
            </div>

            <div className="compatibility-grid">
              {/* Can Receive From */}
              <div className="compatibility-section receive-section">
                <div className="section-header">
                  <span className="section-icon">⬇️</span>
                  <h4>Can Receive From</h4>
                </div>
                <div className="blood-groups-display">
                  {bloodCompatibility[selectedGroup].take.map((group) => (
                    <span 
                      key={group}
                      className="mini-blood-badge"
                      style={{ backgroundColor: getBloodGroupColor(group) }}
                    >
                      {group}
                    </span>
                  ))}
                </div>
                <p className="section-description">
                  These blood types are safe to receive during transfusion
                </p>
              </div>

              {/* Can Donate To */}
              <div className="compatibility-section donate-section">
                <div className="section-header">
                  <span className="section-icon">⬆️</span>
                  <h4>Can Donate To</h4>
                </div>
                <div className="blood-groups-display">
                  {bloodCompatibility[selectedGroup].give.map((group) => (
                    <span 
                      key={group}
                      className={`mini-blood-badge ${group.includes('Universal') || group.includes('Everyone') ? 'universal' : ''}`}
                      style={{ 
                        backgroundColor: group.includes('Universal') || group.includes('Everyone') 
                          ? '#16a34a' 
                          : getBloodGroupColor(group) 
                      }}
                    >
                      {group.includes('Universal') || group.includes('Everyone') ? '🌍 Universal' : group}
                    </span>
                  ))}
                </div>
                <p className="section-description">
                  Your blood can help save lives of these recipients
                </p>
              </div>
            </div>

            {/* Special Note */}
            <div className="special-note">
              <span className="note-icon">⭐</span>
              <p>{getCompatibilityFacts(selectedGroup).specialNote}</p>
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="impact-stats">
            <div className="stat-card">
              <div className="stat-number">3</div>
              <div className="stat-label">Lives Saved</div>
              <div className="stat-description">per donation</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">470ml</div>
              <div className="stat-label">Blood Donated</div>
              <div className="stat-description">average amount</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">8</div>
              <div className="stat-label">Weeks Between</div>
              <div className="stat-description">donations</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="cta-section">
            <h3>Ready to Make a Difference?</h3>
            <p>Your {selectedGroup} blood type is needed to help save lives in your community.</p>
            <div className="cta-buttons">
              <button className="cta-btn primary">Find Donation Center</button>
              <button className="cta-btn secondary">Schedule Appointment</button>
            </div>
          </div>
        </div>
      )}

      {/* Educational Content */}
      <div className="education-section">
        <div className="education-cards">
          <div className="education-card">
            <div className="card-icon">💡</div>
            <h4>Did You Know?</h4>
            <p>Blood cannot be manufactured artificially - it can only come from generous donors like you.</p>
          </div>
          <div className="education-card">
            <div className="card-icon">⚡</div>
            <h4>Quick Process</h4>
            <p>The entire donation process takes about 45-60 minutes, with actual donation taking only 8-10 minutes.</p>
          </div>
          <div className="education-card">
            <div className="card-icon">❤️</div>
            <h4>Always Needed</h4>
            <p>Blood is needed every 2 seconds in hospitals across the country for emergency and routine medical care.</p>
          </div>
        </div>
      </div>
    </div>
  );
}