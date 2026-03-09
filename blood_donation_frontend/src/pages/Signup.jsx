import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupApi } from "../apis/apis";
import "../styles/Signup.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bloodGroup: "",
    phone: "",
    location: "",
    state: "",
    photo: null,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      const file = e.target.files[0];
      setForm({ ...form, photo: file });
      
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPhotoPreview(null);
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {
      await signupApi(formData);
      alert("Signup successful! Please login.");
      navigate("/");
    } catch (err) {
      alert("Signup failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="signup-container">
      {/* Background Pattern */}
      <div className="bg-pattern"></div>
      
      {/* Header */}
      <div className="signup-header">
        <div className="brand-section">
          <div className="brand-icon">🩸</div>
          <h1 className="brand-name">BloodConnect</h1>
        </div>
        <div className="header-content">
          <h2 className="page-title">Join Our Community</h2>
          <p className="page-subtitle">Create your account and start saving lives</p>
        </div>
      </div>

      {/* Signup Form */}
      <div className="signup-content">
        <div className="form-container">
          <div className="form-wrapper">
            {/* Progress Steps */}
            <div className="progress-section">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
              <div className="step-indicators">
                <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                  <span>1</span>
                  <label>Personal Info</label>
                </div>
                <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                  <span>2</span>
                  <label>Medical Info</label>
                </div>
                <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                  <span>3</span>
                  <label>Photo & Finish</label>
                </div>
              </div>
            </div>

            <form onSubmit={handleSignup} className="signup-form">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="form-step active">
                  <h3 className="step-title">Personal Information</h3>
                  
                  <div className="input-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Create a strong password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="form-input"
                      minLength="6"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <button type="button" onClick={nextStep} className="step-button next">
                    Next Step →
                  </button>
                </div>
              )}

              {/* Step 2: Medical & Location Info */}
              {currentStep === 2 && (
                <div className="form-step active">
                  <h3 className="step-title">Medical & Location Details</h3>
                  
                  <div className="input-group blood-group-section">
                    <label>Blood Group</label>
                    <div className="blood-group-grid">
                      {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
                        <label key={type} className={`blood-type-option ${form.bloodGroup === type ? 'selected' : ''}`}>
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

                  <div className="input-row">
                    <div className="input-group">
                      <label htmlFor="location">Location</label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        placeholder="Enter your district"
                        value={form.location}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        name="state"
                        id="state"
                        placeholder="Enter your state"
                        value={form.state}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="step-actions">
                    <button type="button" onClick={prevStep} className="step-button prev">
                      ← Previous
                    </button>
                    <button type="button" onClick={nextStep} className="step-button next">
                      Next Step →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Photo & Final */}
              {currentStep === 3 && (
                <div className="form-step active">
                  <h3 className="step-title">Profile Photo & Finish</h3>
                  
                  <div className="photo-upload-section">
                    <div className="photo-upload">
                      <input
                        type="file"
                        name="photo"
                        id="photo"
                        onChange={handleChange}
                        accept="image/*"
                        className="photo-input"
                      />
                      <label htmlFor="photo" className="photo-label">
                        {photoPreview ? (
                          <img src={photoPreview} alt="Preview" className="photo-preview" />
                        ) : (
                          <div className="photo-placeholder">
                            <span className="camera-icon">📷</span>
                            <span>Upload Your Photo</span>
                            <small>Optional but recommended</small>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="terms-section">
                    <div className="terms-card">
                      <h4>By signing up, you agree to:</h4>
                      <ul>
                        <li>✅ Help save lives through blood donation</li>
                        <li>✅ Provide accurate medical information</li>
                        <li>✅ Respond promptly to donation requests</li>
                        <li>✅ Our terms of service and privacy policy</li>
                      </ul>
                    </div>
                  </div>

                  <div className="step-actions">
                    <button type="button" onClick={prevStep} className="step-button prev">
                      ← Previous
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`submit-button ${isSubmitting ? 'loading' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner"></span>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <span className="heart-icon">❤️</span>
                          Create Account
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="login-link">
              <p>Already have an account? <Link to="/">Login here</Link></p>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="info-panel">
          <div className="welcome-message">
            <div className="welcome-icon">🌟</div>
            <h3>Welcome to BloodConnect!</h3>
            <p>Join thousands of heroes who are making a difference</p>
          </div>

          <div className="benefits-list">
            <div className="benefit-item">
              <div className="benefit-icon">🏥</div>
              <div>
                <h4>Help Patients</h4>
                <p>Connect with people who need your blood type</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">📱</div>
              <div>
                <h4>Easy Process</h4>
                <p>Simple registration and donation tracking</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🔒</div>
              <div>
                <h4>Secure & Private</h4>
                <p>Your data is protected and confidential</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🎖️</div>
              <div>
                <h4>Recognition</h4>
                <p>Earn badges and certificates for donations</p>
              </div>
            </div>
          </div>

          <div className="stats-preview">
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Active Donors</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">2M+</div>
              <div className="stat-label">Lives Saved</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}