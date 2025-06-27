import React, { useState } from "react";

function Login({ onBack }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    newsletter: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
              <div className="border rounded-5">
                <section className="w-100 p-4">
                  <section>
                    <div className="px-4 py-5 px-md-5 text-center text-lg-start" >
                      <div className="container">
                        <div className="row gx-lg-5 align-items-center">
                          <div className="col-lg-6 mb-5 mb-lg-0" >
                            <h1 className="my-5 display-5 fw-bold ls-tight text-white">
                              The best offer <br />
                              <span className="text-primary">for your business</span>
                            </h1>
                            <p style={{ color: '#b8b8b8' }}>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit.
                              Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                              quibusdam tempora at cupiditate quis eum maiores libero
                              veritatis? Dicta facilis sint aliquid ipsum atque?
                            </p>
                            <button type="button" className="btn btn-outline-light mt-3" onClick={onBack}>
                              ← Back to Home
                            </button>
                          </div>

                          <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="card text-light"
                              style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '15px'
                              }}    
                            >
                              <div className="card-body py-5 px-md-5">
                                <form onSubmit={handleSubmit}>
                                  <div className="row">
                                    <div className="col-md-6 mb-4">
                                      <div className="form-outline">
                                        <input 
                                          type="text" 
                                          id="firstName" 
                                          name="firstName"
                                          className="form-control"
                                          value={formData.firstName}
                                          onChange={handleInputChange}
                                          required
                                        />
                                        <label className="form-label" htmlFor="firstName">First name</label>
                                      </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                      <div className="form-outline">
                                        <input 
                                          type="text" 
                                          id="lastName" 
                                          name="lastName"
                                          className="form-control"
                                          value={formData.lastName}
                                          onChange={handleInputChange}
                                          required
                                        />
                                        <label className="form-label" htmlFor="lastName">Last name</label>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-outline mb-4">
                                    <input 
                                      type="email" 
                                      id="email" 
                                      name="email"
                                      className="form-control"
                                      value={formData.email}
                                      onChange={handleInputChange}
                                      required
                                    />
                                    <label className="form-label" htmlFor="email">Email address</label>
                                  </div>

                                  <div className="form-outline mb-4">
                                    <input 
                                      type="password" 
                                      id="password" 
                                      name="password"
                                      className="form-control"
                                      value={formData.password}
                                      onChange={handleInputChange}
                                      required
                                    />
                                    <label className="form-label" htmlFor="password">Password</label>
                                  </div>

                                  <div className="form-check d-flex justify-content-center mb-4">
                                    <input 
                                      className="form-check-input me-2" 
                                      type="checkbox" 
                                      name="newsletter"
                                      id="newsletter" 
                                      checked={formData.newsletter}
                                      onChange={handleInputChange}
                                    />
                                    <label className="form-check-label" htmlFor="newsletter">
                                      Subscribe to our newsletter
                                    </label>
                                  </div>

                                  <button type="submit" className="btn btn-primary btn-block mb-4 w-100">
                                    Sign up
                                  </button>

                                  <div className="text-center">
                                    <p>or sign up with:</p>
                                    <button type="button" className="btn btn-link btn-floating mx-1">
                                      <i className="fab fa-facebook-f"></i>
                                    </button>
                                    <button type="button" className="btn btn-link btn-floating mx-1">
                                      <i className="fab fa-google"></i>
                                    </button>
                                    <button type="button" className="btn btn-link btn-floating mx-1">
                                      <i className="fab fa-twitter"></i>
                                    </button>
                                    <button type="button" className="btn btn-link btn-floating mx-1">
                                      <i className="fab fa-github"></i>
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
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;