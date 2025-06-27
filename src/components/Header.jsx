import reactLogo from '../assets/react.svg'

function Header({ onLoginClick, onSignupClick, onNavigate, activeSection, currentPage }) {
  const handleNavClick = (e, section) => {
    e.preventDefault();
    onNavigate('home', section);
  };

  const isActive = (section) => {
    if (currentPage !== 'home') return false;
    return activeSection === section;
  };

  return (
    <div className="container-fluid" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 999,
      background: 'rgba(30, 34, 45, 0.45)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      
      marginBottom: '60px',
      padding: '18px 32px',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)'
    }}>
      <header
        className="d-flex flex-wrap align-items-center justify-content-between custom-navbar"
        style={{ padding: 0, background: 'none', border: 'none', boxShadow: 'none' }}
      >
        <div style={{ flex: 1 }}></div>
        <div className="d-flex align-items-center gap-3">
          <ul className="nav mb-2 mb-md-0 gap-3 ms-3" style={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center', marginBottom: 0 }}>
            <li>
              <a 
                href="#" 
                className={`nav-link px-3 fw-semibold nav-anim ${isActive('home') ? 'active-nav' : 'text-white'}`}
                onClick={(e) => handleNavClick(e, 'home')}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={`nav-link px-3 fw-semibold nav-anim ${isActive('features') ? 'active-nav' : 'text-white'}`}
                onClick={(e) => handleNavClick(e, 'features')}
              >
                Features
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={`nav-link px-3 fw-semibold nav-anim ${isActive('pricing') ? 'active-nav' : 'text-white'}`}
                onClick={(e) => handleNavClick(e, 'pricing')}
              >
                Pricing
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={`nav-link px-3 fw-semibold nav-anim ${isActive('faqs') ? 'active-nav' : 'text-white'}`}
                onClick={(e) => handleNavClick(e, 'faqs')}
              >
                FAQs
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={`nav-link px-3 fw-semibold nav-anim ${isActive('about') ? 'active-nav' : 'text-white'}`}
                onClick={(e) => handleNavClick(e, 'about')}
              >
                About
              </a>
            </li>
            <li>
              <button
                type="button"
                className="btn btn-outline-light ms-3 custom-btn"
                onClick={onLoginClick}
                style={{ borderRadius: '8px', borderWidth: '2px', fontWeight: 600 }}
              >
                Login
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn btn-light text-dark ms-2 custom-btn"
                style={{ borderRadius: '8px', fontWeight: 600 }}
                onClick={onSignupClick}
              >
                Sign-up
              </button>
            </li>
          </ul>
        </div>
      </header>
      <style>{`
        .custom-navbar .nav-anim {
          transition: color 0.2s, background 0.2s, box-shadow 0.2s;
          border-radius: 6px;
          cursor: pointer;
        }
        .custom-navbar .nav-anim:hover {
          color: #339af0 !important;
          background: rgba(255,255,255,0.08);
          box-shadow: 0 2px 8px 0 rgba(51,154,240,0.10);
        }
        .custom-navbar .active-nav {
          color: #339af0 !important;
          background: rgba(51,154,240,0.15);
          box-shadow: 0 2px 8px 0 rgba(51,154,240,0.15);
        }
        .custom-btn {
          transition: box-shadow 0.2s, background 0.2s, color 0.2s;
        }
        .custom-btn:hover {
          box-shadow: 0 2px 12px 0 rgba(51,154,240,0.18);
          background: #339af0 !important;
          color: #fff !important;
          border-color: #339af0 !important;
        }
      `}</style>
    </div>
  );
}

export default Header