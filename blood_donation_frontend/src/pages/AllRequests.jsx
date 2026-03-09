import { useEffect, useState } from "react";
import { getAllRequests } from "../apis/apis";
import "../styles/AllRequests.css";

export default function AllRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAllRequests();
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      'A+': '#ef4444', 'A-': '#f97316',
      'B+': '#eab308', 'B-': '#84cc16',
      'O+': '#10b981', 'O-': '#06b6d4',
      'AB+': '#8b5cf6', 'AB-': '#ec4899'
    };
    return colors[bloodGroup] || '#dc2626';
  };

  const getUrgencyLevel = (neededByDate) => {
    const today = new Date();
    const neededDate = new Date(neededByDate);
    const timeDiff = neededDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff <= 1) return { level: 'critical', text: 'URGENT', color: '#dc2626' };
    if (daysDiff <= 3) return { level: 'high', text: 'HIGH PRIORITY', color: '#ea580c' };
    if (daysDiff <= 7) return { level: 'medium', text: 'MODERATE', color: '#ca8a04' };
    return { level: 'low', text: 'PLANNED', color: '#16a34a' };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeAgo = () => {
    const timeOptions = [
      "1 hour ago", "3 hours ago", "6 hours ago", "1 day ago", 
      "2 days ago", "4 hours ago", "8 hours ago"
    ];
    return timeOptions[Math.floor(Math.random() * timeOptions.length)];
  };

  return (
    <div className="all-requests-container">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">🆘</span>
            Blood Requests
          </h1>
          <p className="page-subtitle">Urgent requests from people in need of blood donations</p>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <span className="results-count">
          {loading ? "Loading..." : `${requests.length} active request${requests.length !== 1 ? 's' : ''}`}
        </span>
      </div>

      {/* Requests Feed */}
      <div className="requests-feed">
        {loading ? (
          <div className="loading-container">
            {[1, 2, 3].map((i) => (
              <div key={i} className="request-card loading">
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
        ) : requests.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No active requests</h3>
            <p>There are currently no blood requests in your area.</p>
          </div>
        ) : (
          <div className="requests-grid">
            {requests.map((request, index) => {
              const photoUrl = request.user.photo
                ? `data:image/jpeg;base64,${request.user.photo}`
                : "https://via.placeholder.com/60";
              
              const urgency = getUrgencyLevel(request.neededByDate);

              return (
                <div key={request.id} className="request-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Urgency Banner */}
                  <div className="urgency-banner" style={{ backgroundColor: urgency.color }}>
                    <span className="urgency-text">{urgency.text}</span>
                  </div>

                  {/* Card Header */}
                  <div className="card-header">
                    <div className="profile-section">
                      <div className="avatar-container">
                        <img src={photoUrl} alt="profile" className="profile-avatar" />
                        <div className="urgent-indicator"></div>
                      </div>
                      <div className="profile-info">
                        <h3 className="requester-name">{request.user.name}</h3>
                        <div className="request-meta">
                          <span className="blood-group-badge" style={{ backgroundColor: getBloodGroupColor(request.bloodGroup) }}>
                            {request.bloodGroup} NEEDED
                          </span>
                        </div>
                        <div className="location-info">
                          <span className="location-icon">📍</span>
                          {request.location}
                        </div>
                      </div>
                    </div>
                    <div className="post-time">{getTimeAgo()}</div>
                  </div>

                  {/* Card Content */}
                  <div className="card-content">
                    <div className="request-details">
                      <div className="detail-item">
                        <span className="detail-label">Needed by:</span>
                        <span className="detail-value urgent-date">{formatDate(request.neededByDate)}</span>
                      </div>
                      {request.hospitalName && (
                        <div className="detail-item">
                          <span className="detail-label">Hospital:</span>
                          <span className="detail-value">{request.hospitalName}</span>
                        </div>
                      )}
                      {request.reason && (
                        <div className="detail-item">
                          <span className="detail-label">Purpose:</span>
                          <span className="detail-value">{request.reason}</span>
                        </div>
                      )}
                    </div>

                    <div className="request-message">
                      <p>
                        "Urgently seeking {request.bloodGroup} blood donors in {request.location}. 
                        Your donation could save a life. Please reach out if you can help."
                      </p>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="card-actions">
                    <div className="action-stats">
                      <div className="stat-item">
                        <span className="stat-icon">❤️</span>
                        <span className="stat-count">{Math.floor(Math.random() * 30) + 5}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-icon">💬</span>
                        <span className="stat-count">{Math.floor(Math.random() * 15) + 2}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-icon">🔄</span>
                        <span className="stat-count">{Math.floor(Math.random() * 25) + 3}</span>
                      </div>
                    </div>

                    <div className="contact-actions">
                      <a href={`mailto:${request.user.email}`} className="action-btn email-btn">
                        <span className="btn-icon">✉️</span>
                        Email
                      </a>
                      <a href={`tel:${request.user.phone}`} className="action-btn call-btn">
                        <span className="btn-icon">📞</span>
                        Call Now
                      </a>
                      <button className="action-btn donate-btn">
                        <span className="btn-icon">🩸</span>
                        I Can Help
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