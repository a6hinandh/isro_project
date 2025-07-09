import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
  return (
    <div className="container-fluid" style={{
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(5px)',
      padding: '40px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderTopLeftRadius: '15px',
      borderTopRightRadius: '15px'
    }}>
      <footer className="py-5">
        <div className="row">
          <div className="col-6 col-md-3 mb-4">
            <h5 className="text-white">Astra-Q</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Overview</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Use Cases</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Learn More</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Contact</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-3 mb-4">
            <h5 className="text-white">Developers</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Documentation</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">API Access</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">GitHub Repo</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-3 mb-4">
            <h5 className="text-white">Resources</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">FAQ</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Help Center</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <form>
              <h5 className="text-white">Subscribe</h5>
              <p className="text-white">Get updates on new features and data releases.</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <input id="newsletter1" type="email" className="form-control" placeholder="Email address" />
                <button className="btn btn-outline-light" type="button">Subscribe</button>
              </div>
            </form>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center pt-4 mt-4 border-top border-light">
          <p className="text-white mb-2 mb-sm-0">© 2025 Astra-Q | Built with ❤️ for ISRO enthusiasts.</p>
          <div className="d-flex gap-3">
            <a className="text-white" href="#" aria-label="GitHub"><GitHubIcon /></a>
            <a className="text-white" href="#" aria-label="Twitter"><TwitterIcon /></a>
            <a className="text-white" href="#" aria-label="Email"><EmailIcon /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
