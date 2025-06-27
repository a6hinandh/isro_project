import reactLogo from '../assets/react.svg'

function Header({ onLoginClick }) {
  return (
    <div className="container-fluid"> 
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '15px',
          margin: '10px',
          padding: '15px'
        }}> 
        <div className="col-md-3 mb-2 mb-md-0"> 
          <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none"> 
          <img src={reactLogo} alt="Logo" width="40" height="32" />
          <span className="ms-2 text-white fs-5">Project</span>
          </a> 
        </div> 
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0"> 
          <li><a href="#" className="nav-link px-2 text-white">Home</a></li>
          <li><a href="#" className="nav-link px-2 text-white">Features</a></li> 
          <li><a href="#" className="nav-link px-2 text-white">Pricing</a></li> 
          <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li> 
          <li><a href="#" className="nav-link px-2 text-white">About</a></li> 
        </ul> 
        <div className="col-md-3 text-end"> 
          <button type="button" className="btn btn-outline-light me-2" onClick={onLoginClick}>Login</button> 
          <button type="button" className="btn btn-light text-dark">Sign-up</button> 
        </div> 
      </header> 
    </div>
  )
}

export default Header