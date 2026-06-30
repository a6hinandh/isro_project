import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import './login.css';

function Login({ onSignup, onLogin }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      onLogin();
    } catch (err) {
      const code = err.code;
      if (code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (code === 'auth/wrong-password') {
        setError('Incorrect password.');
      } else if (code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container text-white min-vh-100">
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center min-vh-100 py-5">
          <div className="col-12">
            <section className="pb-4">
              <section className="w-100 p-4">
                <section>
                  <div className="px-4 py-5 px-md-5 text-center text-lg-start">
                    <div className="container">
                      <div className="row gx-lg-5 align-items-center justify-content-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                          <h1 className="my-5 display-5 fw-bold ls-tight text-white">
                            Welcome Back<br />
                            <span className="text-primary">Sign in to your account</span>
                          </h1>
                          <p className="login-text">
                            Enter your email and password to access your account. Don't have an account yet? Create one using the signup link in the form.
                          </p>
                        </div>
                        <div className="col-lg-6 mb-5 mb-lg-0">
                          <div className="card text-light login-card">
                            <div className="card-overlay"></div>
                            <div className="card-body py-5 px-md-5">
                              <div className="text-center mb-4">
                                <div className="login-icon-wrapper">
                                  <span className="login-icon">🔐</span>
                                </div>
                                <h3 className="text-white mb-3 fw-bold">Secure Login</h3>
                                <p className="login-subtext">
                                  Enter your credentials to continue
                                </p>
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
                                <div className="form-outline mb-4">
                                  <div className="input-wrapper">
                                    <span className="input-icon">👤</span>
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
                                </div>
                                <div className="form-outline mb-4">
                                  <div className="input-wrapper">
                                    <span className="input-icon">🔑</span>
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
                                <button 
                                  type="submit" 
                                  className="btn btn-primary btn-block mb-4 w-100 modern-btn"
                                  disabled={loading}
                                >
                                  {loading ? '⏳ Signing in...' : '🚀 ACCESS GRANTED'}
                                </button>
                                <div className="d-flex justify-content-between align-items-center">
                                  <button
                                    type="button"
                                    className="btn btn-link text-decoration-none small p-0 forgot-password"
                                  >
                                    🔐 Forgot Password?
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-link text-decoration-none small p-0 signup-link"
                                    onClick={onSignup}
                                  >
                                    ✨ Create Account
                                  </button>
                                </div>
                              </form>
                            </div>
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

export default Login;
