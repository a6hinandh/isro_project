function Services() {
  return (
    <section className="py-5" style={{
      color: '#f6f7fa',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(8px)',
      borderRadius: '15px',
      marginBottom: '30px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="container-fluid px-5">
        <div className="row text-center">
          <div className="col-lg-4 mb-4">
            <svg
              className="bd-placeholder-img rounded-circle mb-3"
              width="140"
              height="140"
              xmlns=""
              role="img"
              aria-label="Placeholder"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#343a40" />
            </svg>
            <h2 className="fw-semibold" style={{ color: '#e599f7' }}>Heading One</h2>
            <p style={{ color: '#ffffff' }}>
              Some representative placeholder content for the first column. Brief, useful, and clean.
            </p>
            <p>
              <a className="btn btn-outline-light" href="#">View details »</a>
            </p>
          </div>

          <div className="col-lg-4 mb-4">
            <svg
              className="bd-placeholder-img rounded-circle mb-3"
              width="140"
              height="140"
              xmlns=""
              role="img"
              aria-label="Placeholder"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#343a40" />
            </svg>
            <h2 className="fw-semibold" style={{ color: '#e599f7' }}>Heading Two</h2>
            <p style={{ color: '#ffffff' }}>
              A little more content here to distinguish the second column. Still simple and responsive.
            </p>
            <p>
              <a className="btn btn-outline-light" href="#">View details »</a>
            </p>
          </div>

          <div className="col-lg-4 mb-4">
            <svg
              className="bd-placeholder-img rounded-circle mb-3"
              width="140"
              height="140"
              xmlns=""
              role="img"
              aria-label="Placeholder"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#343a40" />
            </svg>
            <h2 className="fw-semibold" style={{ color: '#e599f7' }}>Heading Three</h2>
            <p style={{ color: '#ffffff' }}>
              And the third column wraps things up with a consistent tone and structure.
            </p>
            <p>
              <a className="btn btn-outline-light" href="#">View details »</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services