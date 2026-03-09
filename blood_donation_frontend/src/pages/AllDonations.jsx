import { useEffect, useState } from "react";
import { getAllDonors, filterDonations } from "../apis/apis";
import "../styles/AllDonations.css";

export default function AllDonations() {
  const [donations, setDonations] = useState([]);
  const [filters, setFilters] = useState({ bloodGroup: "", district: "", gender: "" });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (filters.bloodGroup || filters.district || filters.gender) {
        // Need to update filter backend later, for now we will just use it as is or fallback to all donors
        const res = await filterDonations(filters);
        setDonations(res.data);
      } else {
        const res = await getAllDonors();
        setDonations(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const clearFilters = () => {
    setFilters({ bloodGroup: "", district: "", gender: "" });
  };

  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      'A+': '#ef4444', 'A-': '#f97316',
      'B+': '#eab308', 'B-': '#84cc16',
      'O+': '#10b981', 'O-': '#06b6d4',
      'AB+': '#8b5cf6', 'AB-': '#ec4899'
    };
    return colors[bloodGroup] || '#8b1538';
  };

  const getTimeAgo = () => {
    const timeOptions = [
      "2 hours ago", "5 hours ago", "1 day ago", "2 days ago", 
      "3 days ago", "1 week ago", "2 weeks ago"
    ];
    return timeOptions[Math.floor(Math.random() * timeOptions.length)];
  };

  return (
    <div className="all-donations-container">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">🩸</span>
            Blood Donors Community
          </h1>
          <p className="page-subtitle">Connect with life-saving donors in your area</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-container">
          <div className="filter-group">
            <label className="filter-label">Blood Group</label>
            <select
              className="filter-select"
              value={filters.bloodGroup}
              onChange={(e) => setFilters({ ...filters, bloodGroup: e.target.value })}
            >
              <option value="">All Blood Groups</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">District</label>
            <input
              className="filter-input"
              type="text"
              placeholder="Enter district name"
              value={filters.district}
              onChange={(e) => setFilters({ ...filters, district: e.target.value })}
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Gender</label>
            <select
              className="filter-select"
              value={filters.gender}
              onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
            >
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear All
          </button>
        </div>

        {/* Active Filters Display */}
        {(filters.bloodGroup || filters.district || filters.gender) && (
          <div className="active-filters">
            <span className="active-filters-label">Active filters:</span>
            {filters.bloodGroup && (
              <span className="filter-tag">
                Blood: {filters.bloodGroup}
                <button onClick={() => setFilters({...filters, bloodGroup: ""})}>×</button>
              </span>
            )}
            {filters.district && (
              <span className="filter-tag">
                District: {filters.district}
                <button onClick={() => setFilters({...filters, district: ""})}>×</button>
              </span>
            )}
            {filters.gender && (
              <span className="filter-tag">
                Gender: {filters.gender}
                <button onClick={() => setFilters({...filters, gender: ""})}>×</button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="results-info">
        <span className="results-count">
          {loading ? "Loading..." : `${donations.length} donor${donations.length !== 1 ? 's' : ''} found`}
        </span>
      </div>

      {/* Donors Feed */}
      <div className="donors-feed">
        {loading ? (
          <div className="loading-container">
            {[1, 2, 3].map((i) => (
              <div key={i} className="donor-card loading">
                <div className="card-header">
                  <div className="profile-section">
                    <div className="avatar-skeleton"></div>
                    <div className="profile-info">
                      <div className="name-skeleton"></div>
                      <div className="meta-skeleton"></div>
                    </div>
                  </div>
                </div>
                <div className="card-content">
                  <div className="content-skeleton"></div>
                  <div className="content-skeleton short"></div>
                </div>
              </div>
            ))}
          </div>
        ) : donations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No donors found</h3>
            <p>Try adjusting your filters or check back later for new donors.</p>
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="donors-grid">
            {donations.map((donor, index) => {
              const photoUrl = donor.photo
                ? `data:image/jpeg;base64,${donor.photo}`
                : "https://via.placeholder.com/60";

              return (
                <div key={donor.id} className="donor-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Card Header */}
                  <div className="card-header">
                    <div className="profile-section">
                      <div className="avatar-container">
                        <img src={photoUrl} alt="profile" className="profile-avatar" />
                        <div className="online-indicator"></div>
                      </div>
                      <div className="profile-info">
                        <h3 className="donor-name">{donor.name}</h3>
                        <div className="donor-meta">
                          <span className="blood-group-badge" style={{ backgroundColor: getBloodGroupColor(donor.bloodGroup) }}>
                            {donor.bloodGroup}
                          </span>cd
                          <span className="donor-age">{donor.gender}, {donor.age} years</span>
                        </div>
                        <div className="location-info">
                          <span className="location-icon">📍</span>
                          {donor.district}
                        </div>
                      </div>
                    </div>
                    <div className="post-time">{getTimeAgo()}</div>
                  </div>

                  {/* Card Content */}
                  <div className="card-content">
                    <div className="donation-status">
                      <div className="status-indicator">
                        <div className="pulse-dot"></div>
                        <span>Available for donation</span>
                      </div>
                    </div>
                    <p className="donation-message">
                      "Ready to help save lives! I believe every drop counts in making a difference. 
                      Feel free to reach out if you need my blood type."
                    </p>
                  </div>

                  {/* Card Actions */}
                  <div className="card-actions">
                    <div className="action-stats">
                      <div className="stat-item">
                        <span className="stat-icon">❤️</span>
                        <span className="stat-count">{Math.floor(Math.random() * 50) + 10}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-icon">💬</span>
                        <span className="stat-count">{Math.floor(Math.random() * 20) + 2}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-icon">🔄</span>
                        <span className="stat-count">{Math.floor(Math.random() * 15) + 1}</span>
                      </div>
                    </div>

                    <div className="contact-actions">
                      <a href={`mailto:${donor.email}`} className="action-btn email-btn">
                        <span className="btn-icon">✉️</span>
                        Email
                      </a>
                      <a href={`tel:${donor.phone}`} className="action-btn call-btn">
                        <span className="btn-icon">📞</span>
                        Call
                      </a>
                      <button className="action-btn message-btn">
                        <span className="btn-icon">💬</span>
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}