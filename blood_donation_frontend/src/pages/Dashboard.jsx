import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateProfileApi, deleteProfileApi } from "../apis/apis";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel images - real blood donation images
  const carouselImages = [
    "https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  ];

  const carouselTexts = [
    {
      title: "Save Lives Today",
      subtitle: "Your donation can save up to 3 lives"
    },
    {
      title: "Be a Hero",
      subtitle: "Join thousands of donors making a difference"
    },
    {
      title: "Quick & Safe",
      subtitle: "Professional staff, sterile equipment, comfortable environment"
    },
    {
      title: "Every Drop Counts",
      subtitle: "Help us maintain critical blood supply for emergencies"
    }
  ];

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="no-user">
          <div className="pulse-animation">
            <div className="heart-icon">❤️</div>
          </div>
          <h2>No user found. Please login again.</h2>
        </div>
      </div>
    );
  }

  const photoUrl = user.photo
    ? `data:image/jpeg;base64,${user.photo}`
    : "https://via.placeholder.com/40";

  const handleUpdate = async () => {
    const formData = new FormData();
    const newName = prompt("Enter new name:", user.name);
    const newPhone = prompt("Enter new phone:", user.phone);
    const newLocation = prompt("Enter new location:", user.location);

    if (newName) formData.append("name", newName);
    if (newPhone) formData.append("phone", newPhone);
    if (newLocation) formData.append("location", newLocation);

    try {
      const res = await updateProfileApi(user.email, formData);
      alert("Profile updated!");
      sessionStorage.setItem("user", JSON.stringify(res.data));
      window.location.reload();
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await deleteProfileApi(user.email);
        alert("Account deleted successfully.");
        sessionStorage.removeItem("user");
        window.location.href = "/";
      } catch (err) {
        alert("Failed to delete profile");
      }
    }
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-brand">
            <div className="logo-icon">🩸</div>
            <h2 className="brand-text">BloodConnect</h2>
          </div>

          <div className="nav-links">
            <Link to="/donate" className="nav-link">Donate</Link>
            <Link to="/request" className="nav-link">Request</Link>
            <Link to="/compatibility" className="nav-link">Compatibility</Link>
            <Link to="/alldonations" className="nav-link">All Donations</Link>
            <Link to="/allrequests" className="nav-link">All Requests</Link>
          </div>

          <div className="nav-profile">
            <div className="profile-wrapper">
              <img
                src={photoUrl}
                alt="profile"
                className="profile-image"
                onClick={() => setShowProfile(!showProfile)}
              />
              <div className="online-indicator"></div>
            </div>

            {showProfile && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <img src={photoUrl} alt="profile" className="dropdown-avatar" />
                  <div className="dropdown-info">
                    <h4>{user.name}</h4>
                    <span className="blood-type">{user.bloodGroup}</span>
                  </div>
                </div>
                
                <div className="dropdown-details">
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{user.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{user.phone}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">{user.district}, {user.state}</span>
                  </div>
                </div>

                <div className="dropdown-actions">
                  <button onClick={handleUpdate} className="btn btn-update">
                    ✏️ Update
                  </button>
                  <button onClick={handleDelete} className="btn btn-delete">
                    🗑️ Delete
                  </button>
                  <button
                    onClick={() => {
                      sessionStorage.removeItem("user");
                      window.location.href = "/";
                    }}
                    className="btn btn-logout"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section with Carousel */}
      <section className="hero-section">
        <div className="carousel-container">
          <div className="carousel-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {carouselImages.map((image, index) => (
              <div key={index} className="carousel-slide">
                <img src={image} alt={`Blood donation ${index + 1}`} />
                <div className="slide-overlay">
                  <div className="slide-content">
                    <h1 className="slide-title">{carouselTexts[index].title}</h1>
                    <p className="slide-subtitle">{carouselTexts[index].subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="carousel-indicators">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        <div className="welcome-section">
          <div className="welcome-content">
            <h1 className="welcome-title">
              Welcome back, <span className="user-name">{user.name}</span> 
              <span className="wave">👋</span>
            </h1>
            <p className="welcome-subtitle">Ready to make a difference today?</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">2M+</div>
            <div className="stat-label">Lives Saved</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Active Donors</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Daily Donations</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Emergency Support</div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fab">
        <Link to="/donate" className="fab-button">
          <span className="fab-icon">+</span>
          <span className="fab-tooltip">Quick Donate</span>
        </Link>
      </div>
    </div>
  );
}