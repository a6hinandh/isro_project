import reactLogo from '../assets/react.svg'

function Header({ onLoginClick, onSignupClick }) {
  return (
    <div className="container" style={{
      background: 'rgba(30, 34, 45, 0.45)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '20px',
      marginTop: '16px',
      marginBottom: '30px',
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
            <li><a href="#" className="nav-link px-3 text-white fw-semibold nav-anim">Home</a></li>
            <li><a href="#" className="nav-link px-3 text-white fw-semibold nav-anim">Features</a></li>
            <li><a href="#" className="nav-link px-3 text-white fw-semibold nav-anim">Pricing</a></li>
            <li><a href="#" className="nav-link px-3 text-white fw-semibold nav-anim">FAQs</a></li>
            <li><a href="#" className="nav-link px-3 text-white fw-semibold nav-anim">About</a></li>
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
        }
        .custom-navbar .nav-anim:hover {
          color: #339af0 !important;
          background: rgba(255,255,255,0.08);
          box-shadow: 0 2px 8px 0 rgba(51,154,240,0.10);
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