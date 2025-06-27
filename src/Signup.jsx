import React, { useState } from "react";

function Signup({ onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    // Add signup logic here
    console.log('Signup submitted:', formData);
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
                    <div className="row gx-lg-5 align-items-center">
                      <div className="col-lg-6 mb-5 mb-lg-0">
                        <h1 className="my-5 display-5 fw-bold ls-tight text-white">
                          Create Account<br />
                          <span className="text-primary">Sign up to get started</span>
                        </h1>
                        <p style={{ color: '#b8b8b8' }}>
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
                        <div className="card text-light signup-card"
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
                                <span style={{ fontSize: '32px', color: 'white' }}>👤</span>
                              </div>
                              <h3 className="text-white mb-3 fw-bold">Join Us Today</h3>
                            </div>
                            
                            <form onSubmit={handleSubmit}>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-outline mb-4">
                                    <input
                                      type="text"
                                      id="name"
                                      name="name"
                                      className="form-control modern-input"
                                      style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                        border: '2px solid rgba(255, 255, 255, 0.15)',
                                        color: 'white',
                                        borderRadius: '15px',
                                        padding: '15px 20px',
                                        fontSize: '16px',
                                        transition: 'all 0.3s ease'
                                      }}
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
                                      style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                        border: '2px solid rgba(255, 255, 255, 0.15)',
                                        color: 'white',
                                        borderRadius: '15px',
                                        padding: '15px 20px',
                                        fontSize: '16px',
                                        transition: 'all 0.3s ease'
                                      }}
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
                                  style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                    border: '2px solid rgba(255, 255, 255, 0.15)',
                                    color: 'white',
                                    borderRadius: '15px',
                                    padding: '15px 20px',
                                    fontSize: '16px',
                                    transition: 'all 0.3s ease'
                                  }}
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  placeholder="📱 Phone Number"
                                  required
                                />
                              </div>
                              
                              <div className="form-outline mb-4">
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
                                    padding: '15px 20px',
                                    fontSize: '16px',
                                    transition: 'all 0.3s ease'
                                  }}
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  placeholder="✉️ Email Address"
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
                                      style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                        border: '2px solid rgba(255, 255, 255, 0.15)',
                                        color: 'white',
                                        borderRadius: '15px',
                                        padding: '15px 20px',
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
                                <div className="col-md-6">
                                  <div className="form-outline mb-4">
                                    <input
                                      type="password"
                                      id="confirmPassword"
                                      name="confirmPassword"
                                      className="form-control modern-input"
                                      style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                        border: '2px solid rgba(255, 255, 255, 0.15)',
                                        color: 'white',
                                        borderRadius: '15px',
                                        padding: '15px 20px',
                                        fontSize: '16px',
                                        transition: 'all 0.3s ease'
                                      }}
                                      value={formData.confirmPassword}
                                      onChange={handleInputChange}
                                      placeholder="🔒 Confirm Password"
                                      required
                                    />
                                  </div>
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
                                🚀 Create Account
                              </button>
                              
                              <div className="text-center">
                                <span className="me-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Already have an account?</span>
                                <button
                                  type="button"
                                  className="btn btn-link text-decoration-none p-0"
                                  style={{ 
                                    color: '#4dabf7',
                                    fontWeight: '600',
                                    textShadow: '0 0 10px rgba(77, 171, 247, 0.5)'
                                  }}
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
        
        .signup-card {
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

export default Signup;