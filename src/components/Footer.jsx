function Footer() {
  return (
    <div className="container" style={{
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(5px)',
      borderRadius: '15px',
      padding: '20px',
      marginBottom: '30px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <footer className="py-5">
        <div className="row">
          <div className="col-6 col-md-2 mb-3">
            <h5 className="text-white">Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Home</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Features</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Pricing</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">FAQs</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">About</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5 className="text-white">Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Home</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Features</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Pricing</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">FAQs</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">About</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5 className="text-white">Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Home</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Features</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Pricing</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">FAQs</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">About</a></li>
            </ul>
          </div>

          <div className="col-md-5 offset-md-1 mb-3">
            <form>
              <h5 className="text-white">Subscribe to our newsletter</h5>
              <p className="text-white">Monthly digest of what's new and exciting from us.</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                <input id="newsletter1" type="email" className="form-control" placeholder="Email address" />
                <button className="btn btn-primary" type="button">Subscribe</button>
              </div>
            </form>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between  border-top border-light">
          <p className="text-white">© 2025 Company, Inc. All rights reserved.</p>
          <ul className="list-unstyled d-flex">
            <li className="ms-3">
              <a className="text-white" href="#" aria-label="Instagram">
                <svg className="bi" width="24" height="24">
                  <use xlinkHref="#instagram" />
                </svg>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-white" href="#" aria-label="Facebook">
                <svg className="bi" width="24" height="24" aria-hidden="true">
                  <use xlinkHref="#facebook" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default Footer