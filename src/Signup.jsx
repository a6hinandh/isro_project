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
                        <button type="button" className="btn btn-outline-light mt-3" onClick={onLogin}>
                          Already have an account? Login
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
                              <div className="form-outline mb-4">
                                <input
                                  type="text"
                                  id="name"
                                  name="name"
                                  className="form-control"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                  required
                                />
                                <label className="form-label" htmlFor="name">Full Name</label>
                              </div>
                              <div className="form-outline mb-4">
                                <input
                                  type="number"
                                  id="age"
                                  name="age"
                                  className="form-control"
                                  value={formData.age}
                                  onChange={handleInputChange}
                                  required
                                />
                                <label className="form-label" htmlFor="age">Age</label>
                              </div>
                              <div className="form-outline mb-4">
                                <input
                                  type="tel"
                                  id="phone"
                                  name="phone"
                                  className="form-control"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  required
                                />
                                <label className="form-label" htmlFor="phone">Phone Number</label>
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
                              <div className="form-outline mb-4">
                                <input
                                  type="password"
                                  id="confirmPassword"
                                  name="confirmPassword"
                                  className="form-control"
                                  value={formData.confirmPassword}
                                  onChange={handleInputChange}
                                  required
                                />
                                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                              </div>
                              <button type="submit" className="btn btn-primary btn-block mb-3 w-100">
                                Sign up
                              </button>
                              <div className="d-flex justify-content-end align-items-center mb-2">
                                <span className="me-2">Already have an account?</span>
                                <a href="#" className="text-decoration-none text-info small" onClick={e => { e.preventDefault(); onLogin(); }}>Login</a>
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