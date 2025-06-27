import React, { useState } from "react";

function Login({ onSignup }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
  };

  return (
    <div className="text-white min-vh-100">
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
                          <p style={{ color: '#b8b8b8' }}>
                            Enter your email and password to access your account. Don't have an account yet? Create one using the signup link in the form.
                          </p>
                        </div>
                        <div className="col-lg-6 mb-5 mb-lg-0">
                          <div className="card text-light login-card"
                            style={{
                              background: 'linear-gradient(135deg, rgba(88, 86, 214, 0.15) 0%, rgba(255, 154, 158, 0.15) 100%)',
                              backdropFilter: 'blur(20px)',
                              border: '1px solid rgba(255, 255, 255, 0.25)',
                              borderRadius: '25px',
                              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                              position: 'relative',
                              overflow: 'hidden'
                            }}
                          >
                            {/* Animated gradient overlay */}
                            <div style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
                              animation: 'shimmer 3s infinite',
                              pointerEvents: 'none'
                            }}></div>
                            
                            <div className="card-body py-5 px-md-5" style={{ position: 'relative', zIndex: 1 }}>
                              <div className="text-center mb-4">
                                <div style={{
                                  width: '80px',
                                  height: '80px',
                                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                  borderRadius: '50%',
                                  margin: '0 auto 20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
                                  animation: 'pulse 2s infinite'
                                }}>
                                  <span style={{ fontSize: '32px', color: 'white' }}>🔐</span>
                                </div>
                                <h3 className="text-white mb-3 fw-bold">Secure Login</h3>
                                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                                  Enter your credentials to continue
                                </p>
                              </div>
                              
                              <form onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                  <div style={{ position: 'relative' }}>
                                    <span style={{
                                      position: 'absolute',
                                      left: '20px',
                                      top: '50%',
                                      transform: 'translateY(-50%)',
                                      fontSize: '20px',
                                      zIndex: 2
                                    }}>👤</span>
                                    <input
                                      type="email"
                                      id="email"
                                      name="email"
                                      className="form-control modern-input"
                                      style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                        border: '2px solid rgba(255, 255, 255, 0.15)',
                                        color: 'white',
                                        borderRadius: '15px',
                                        padding: '15px 20px 15px 55px',
                                        fontSize: '16px',
                                        transition: 'all 0.3s ease'
                                      }}
                                      value={formData.email}
                                      onChange={handleInputChange}
                                      placeholder="✉️ Email Address"
                                      required
                                    />
                                  </div>
                                </div>
                                
                                <div className="form-outline mb-4">
                                  <div style={{ position: 'relative' }}>
                                    <span style={{
                                      position: 'absolute',
                                      left: '20px',
                                      top: '50%',
                                      transform: 'translateY(-50%)',
                                      fontSize: '20px',
                                      zIndex: 2
                                    }}>🔑</span>
                                    <input
                                      type="password"
                                      id="password"
                                      name="password"
                                      className="form-control modern-input"
                                      style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                        border: '2px solid rgba(255, 255, 255, 0.15)',
                                        color: 'white',
                                        borderRadius: '15px',
                                        padding: '15px 20px 15px 55px',
                                        fontSize: '16px',
                                        transition: 'all 0.3s ease'
                                      }}
                                      value={formData.password}
                                      onChange={handleInputChange}
                                      placeholder="🔒 Password"
                                      required
                                    />
                                  </div>
                                </div>
                                
                                <button 
                                  type="submit" 
                                  className="btn btn-primary btn-block mb-4 w-100 modern-btn"
                                  style={{
                                    borderRadius: '15px',
                                    padding: '15px',
                                    fontWeight: '700',
                                    fontSize: '18px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    border: 'none',
                                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                  }}
                                >
                                  🚀 ACCESS GRANTED
                                </button>
                                
                                <div className="d-flex justify-content-between align-items-center">
                                  <button
                                    type="button"
                                    className="btn btn-link text-decoration-none small p-0"
                                    style={{ 
                                      color: '#4dabf7',
                                      fontWeight: '600',
                                      textShadow: '0 0 10px rgba(77, 171, 247, 0.5)',
                                      transition: 'all 0.3s ease'
                                    }}
                                  >
                                    🔐 Forgot Password?
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-link text-decoration-none small p-0"
                                    style={{ 
                                      color: '#4dabf7',
                                      fontWeight: '600',
                                      textShadow: '0 0 10px rgba(77, 171, 247, 0.5)',
                                      border: 'none',
                                      background: 'none',
                                      transition: 'all 0.3s ease'
                                    }}
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
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); }
          50% { box-shadow: 0 0 30px rgba(102, 126, 234, 0.6), 0 0 40px rgba(102, 126, 234, 0.4); }
        }
        
        .login-card {
          animation: glow 4s ease-in-out infinite;
        }
        
        .modern-input:focus {
          background-color: rgba(255, 255, 255, 0.12) !important;
          border-color: #667eea !important;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2), 0 0 20px rgba(102, 126, 234, 0.3) !important;
          color: white !important;
          transform: translateY(-2px);
        }
        
        .modern-input::placeholder {
          color: rgba(255, 255, 255, 0.6) !important;
        }
        
        .modern-btn:hover {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%) !important;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6) !important;
        }
        
        .modern-btn:active {
          transform: translateY(-1px) scale(0.98);
        }
        
        .btn-link:hover {
          color: #339af0 !important;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}

export default Login;