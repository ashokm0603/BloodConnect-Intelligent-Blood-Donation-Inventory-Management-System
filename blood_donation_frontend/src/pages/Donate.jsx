import { useState } from "react";
import { donorRegisterApi } from "../apis/apis";
import "../styles/Donate.css";

export default function Donate() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    email: "",
    district: "",
    photo: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      const file = e.target.files[0];
      setFormData({ ...formData, photo: file });
      
      // Create preview URL
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setPhotoPreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setPhotoPreview(null);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        payload.append(key, formData[key]);
      });

      await donorRegisterApi(payload);
      
      // Success animation
      const successMessage = document.querySelector('.success-message');
      if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.style.animation = 'slideInUp 0.6s ease-out';
      }
      
      // Reset form
      setFormData({
        name: "",
        age: "",
        gender: "",
        bloodGroup: "",
        phone: "",
        email: "",
        location: "",
        photo: null,
      });
      setPhotoPreview(null);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        if (successMessage) {
          successMessage.style.display = 'none';
        }
      }, 3000);
      
    } catch (err) {
      console.error(err);
      
      // Error animation
      const errorMessage = document.querySelector('.error-message');
      if (errorMessage) {
        errorMessage.style.display = 'block';
        errorMessage.style.animation = 'shake 0.6s ease-out';
        
        setTimeout(() => {
          errorMessage.style.display = 'none';
        }, 3000);
      }
    } finally {
      setIsSubmitting(false);
    }
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

  const removePhoto = () => {
    setFormData({ ...formData, photo: null });
    setPhotoPreview(null);
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="donor-registration-container">
      {/* Header Section */}
      <div className="registration-header">
        <div className="header-content">
          <h1 className="registration-title">
            <span className="title-icon">🩸</span>
            Become a Life Saver
          </h1>
          <p className="registration-subtitle">
            Join our community of heroes and help save lives through blood donation
          </p>
          
        </div>
      </div>

      {/* Form Section */}
      <div className="form-section">
        <div className="form-container">
          <div className="form-header">
            <h2 className="form-title">Registration Form</h2>
            <p className="form-description">
              Please fill in your details to register as a blood donor
            </p>
          </div>

          <form onSubmit={handleSubmit} className="registration-form">
            {/* Photo Upload Section */}
            <div className="photo-upload-section">
              <div className="photo-upload-container">
                {photoPreview ? (
                  <div className="photo-preview">
                    <img src={photoPreview} alt="Preview" className="preview-image" />
                    <button 
                      type="button" 
                      className="remove-photo-btn"
                      onClick={removePhoto}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="photo-placeholder">
                    <div className="upload-icon">📸</div>
                    <p>Upload Photo</p>
                  </div>
                )}
                <input 
                  type="file" 
                  name="photo" 
                  onChange={handleChange}
                  className="photo-input"
                  accept="image/*"
                />
                <div className="upload-overlay">
                  <span className="upload-text">Click to upload</span>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="form-grid">
              {/* Name Field */}
              <div className={`form-group ${focusedField === 'name' ? 'focused' : ''}`}>
                <label className="form-label">Full Name</label>
                <div className="input-container">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              {/* Age Field */}
              <div className={`form-group ${focusedField === 'age' ? 'focused' : ''}`}>
                <label className="form-label">Age</label>
                <div className="input-container">
                  <span className="input-icon">🎂</span>
                  <input
                    type="number"
                    name="age"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('age')}
                    onBlur={() => setFocusedField(null)}
                    className="form-input"
                    min="18"
                    max="65"
                    required
                  />
                </div>
              </div>

              {/* Gender Field */}
              <div className={`form-group ${focusedField === 'gender' ? 'focused' : ''}`}>
                <label className="form-label">Gender</label>
                <div className="input-container">
                  <span className="input-icon">⚧</span>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('gender')}
                    onBlur={() => setFocusedField(null)}
                    className="form-select"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Blood Group Field */}
              <div className={`form-group ${focusedField === 'bloodGroup' ? 'focused' : ''}`}>
                <label className="form-label">Blood Group</label>
                <div className="input-container">
                  <span className="input-icon">🩸</span>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('bloodGroup')}
                    onBlur={() => setFocusedField(null)}
                    className="form-select"
                    required
                  >
                    <option value="">Select Blood Group</option>
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
                {formData.bloodGroup && (
                  <div className="blood-group-preview">
                    <span 
                      className="blood-group-badge"
                      style={{ backgroundColor: getBloodGroupColor(formData.bloodGroup) }}
                    >
                      {formData.bloodGroup}
                    </span>
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div className={`form-group ${focusedField === 'phone' ? 'focused' : ''}`}>
                <label className="form-label">Phone Number</label>
                <div className="input-container">
                  <span className="input-icon">📞</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}>
                <label className="form-label">Email Address</label>
                <div className="input-container">
                  <span className="input-icon">✉️</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              {/* District Field */}
              <div className={`form-group full-width ${focusedField === 'district' ? 'focused' : ''}`}>
                <label className="form-label">location</label>
                <div className="input-container">
                  <span className="input-icon">📍</span>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter your location"
                    value={formData.location}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('location')}
                    onBlur={() => setFocusedField(null)}
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="submit-section">
              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Registering...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🩸</span>
                    Register as Donor
                  </>
                )}
              </button>
              
              <p className="submit-note">
                By registering, you agree to be contacted for blood donation requests
              </p>
            </div>
          </form>



          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Lives Saved</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5,000+</span>
              <span className="stat-label">Active Donors</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Emergency Response</span>
            </div>
          </div>

           

          {/* Success Message */}
          <div className="success-message" style={{ display: 'none' }}>
            <div className="message-content">
              <span className="message-icon">✅</span>
              <h3>Registration Successful!</h3>
              <p>Welcome to our blood donor community. Thank you for your commitment to saving lives!</p>
            </div>
          </div>

          {/* Error Message */}
          <div className="error-message" style={{ display: 'none' }}>
            <div className="message-content">
              <span className="message-icon">❌</span>
              <h3>Registration Failed</h3>
              <p>Please check your details and try again. Contact support if the problem persists.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}