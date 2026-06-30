import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import './signup.css';

function Signup({ onLogin }) {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      await signup(formData.email, formData.password);
      onLogin();
    } catch (err) {
      const code = err.code;
      if (code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (code === 'auth/weak-password') {
        setError('Password is too weak.');
      } else {
        setError('Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container text-white min-vh-100">
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center min-vh-100 py-5">
          <div className="col-12">
            <section className="pb-4">
              <section className="w-100 p-4">
                <section>
                  <div className="px-4 py-5 px-md-5 text-center text-lg-start">
                    <div className="row gx-lg-5 align-items-center">
                      <div className="col-lg-6 mb-5 mb-lg-0">
                        <h1 className="my-5 display-5 fw-bold ls-tight text-white">
                          Create Account<br />
                          <span className="text-primary">Sign up to get started</span>
                        </h1>
                        <p className="signup-text">
                          Fill in your details to create a new account. Already have an account? Use the link below to login.
                        </p>
                        <button 
                          type="button" 
                          className="btn btn-light text-dark ms-2 custom-btn mt-3 px-4 py-2 fw-semibold text-center d-block"
                          onClick={onLogin}
                        >
                          <span>Already have an account?</span><br /><span>Login</span>
                        </button>
                      </div>
                      <div className="col-lg-6 mb-5 mb-lg-0">
                        <div className="card text-light signup-card">
                          <div className="card-overlay"></div>
                          <div className="card-body py-5 px-md-5">
                            <div className="text-center mb-4">
                              <div className="signup-icon-wrapper">
                                <span className="signup-icon">👤</span>
                              </div>
                              <h3 className="text-white mb-3 fw-bold">Join Us Today</h3>
                            </div>
                            {error && (
                              <div style={{
                                backgroundColor: 'rgba(255, 59, 48, 0.15)',
                                border: '1px solid rgba(255, 59, 48, 0.3)',
                                borderRadius: '10px',
                                padding: '10px 14px',
                                marginBottom: '16px',
                                color: '#ff6b6b',
                                fontSize: '14px',
                              }}>
                                {error}
                              </div>
                            )}
                            <form onSubmit={handleSubmit}>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-outline mb-4">
                                    <input
                                      type="text"
                                      id="name"
                                      name="name"
                                      className="form-control modern-input"
                                      value={formData.name}
                                      onChange={handleInputChange}
                                      placeholder="Full Name"
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-outline mb-4">
                                    <input
                                      type="number"
                                      id="age"
                                      name="age"
                                      className="form-control modern-input"
                                      value={formData.age}
                                      onChange={handleInputChange}
                                      placeholder="Age"
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="form-outline mb-4">
                                <input
                                  type="tel"
                                  id="phone"
                                  name="phone"
                                  className="form-control modern-input"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  placeholder=" Phone Number"
                                  required
                                />
                              </div>
                              <div className="form-outline mb-4">
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  className="form-control modern-input"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  placeholder=" Email Address"
                                  required
                                />
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-outline mb-4">
                                    <input
                                      type="password"
                                      id="password"
                                      name="password"
                                      className="form-control modern-input"
                                      value={formData.password}
                                      onChange={handleInputChange}
                                      placeholder=" Password"
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-outline mb-4">
                                    <input
                                      type="password"
                                      id="confirmPassword"
                                      name="confirmPassword"
                                      className="form-control modern-input"
                                      value={formData.confirmPassword}
                                      onChange={handleInputChange}
                                      placeholder=" Confirm Password"
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                              <button 
                                type="submit" 
                                className="btn btn-primary btn-block mb-4 w-100 modern-btn"
                                disabled={loading}
                              >
                                {loading ? '⏳ Creating Account...' : '🚀 Create Account'}
                              </button>
                              <div className="text-center">
                                <span className="me-2 signup-subtext">Already have an account?</span>
                                <button
                                  type="button"
                                  className="btn btn-link text-decoration-none p-0 login-link"
                                  onClick={onLogin}
                                >
                                  Sign In ✨
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </section>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
