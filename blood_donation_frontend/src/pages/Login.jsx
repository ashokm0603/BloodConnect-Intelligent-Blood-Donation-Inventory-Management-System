import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../apis/apis";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await loginApi(email, password);
      
      // Save user data in sessionStorage
      sessionStorage.setItem("email", res.data.email);
      sessionStorage.setItem("user", JSON.stringify(res.data));
      
      // Success animation delay before navigation
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
      
    } catch (err) {
      setError("Invalid credentials. Please try again or signup.");
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      {/* Background Elements */}
      <div className="bg-pattern"></div>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* Main Content */}
      <div className="login-content">
        {/* Left Side - Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="brand-section">
              <div className="brand-icon">🩸</div>
              <h1 className="brand-name">BloodConnect</h1>
            </div>
            
            <div className="hero-text">
              <h2 className="hero-title">Welcome Back, Hero!</h2>
              <p className="hero-subtitle">
                Every drop counts. Every donation saves lives. 
                Continue your journey of making a difference.
              </p>
            </div>

            <div className="feature-highlights">
              <div className="feature-item">
                <div className="feature-icon">🌟</div>
                <span>Save Lives Daily</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🤝</div>
                <span>Connect with Community</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📱</div>
                <span>Track Your Impact</span>
              </div>
            </div>

            <div className="stats-showcase">
              <div className="stat-item">
                <div className="stat-number">2M+</div>
                <div className="stat-label">Lives Saved</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Active Heroes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="form-section">
          <div className="form-wrapper">
            <div className="form-header">
              <h2 className="form-title">Login</h2>
              <p className="form-subtitle">Access your BloodConnect account</p>
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="login-form">
              <div className="input-group">
                <label htmlFor="email" className="input-label">
                  <span className="label-icon">📧</span>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                  disabled={isLoading}
                />
              </div>

              <div className="input-group">
                <label htmlFor="password" className="input-label">
                  <span className="label-icon">🔒</span>
                  Password
                </label>
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="password-toggle"
                    disabled={isLoading}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`submit-button ${isLoading ? 'loading' : ''}`}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Signing In...
                  </>
                ) : (
                  <>
                    <span className="login-icon">🚀</span>
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="form-divider">
              <span>or</span>
            </div>

            <div className="signup-section">
              <p className="signup-text">
                New to BloodConnect?
              </p>
              <Link to="/signup" className="signup-button">
                <span className="signup-icon">✨</span>
                Create New Account
              </Link>
            </div>

            <div className="help-section">
              <a href="#" className="help-link">Forgot Password?</a>
              <span className="help-divider">•</span>
              <a href="#" className="help-link">Need Help?</a>
            </div>
          </div>
        </div>
      </div>

      {/* Success Overlay */}
      {isLoading && (
        <div className="success-overlay">
          <div className="success-content">
            <div className="success-icon">✅</div>
            <h3>Welcome Back!</h3>
            <p>Redirecting to your dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
}