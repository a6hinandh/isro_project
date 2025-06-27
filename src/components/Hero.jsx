import isroRegistered from '../assets/isro-registered.jpg'

function Hero() {
  return (
    <div className="container fluid "
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(5px)',
        borderRadius: '20px',
        padding: '30px',
        marginBottom: '30px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    > 
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5"> 
        <div className="col-10 col-sm-8 col-lg-6"> 
          <img src={isroRegistered} className="d-block mx-lg-auto img-fluid rounded-4 shadow-lg border border-light" alt="Bootstrap Themes" width="700" height="500" loading="lazy" style={{
            backgroundColor: 'black',
            mixBlendMode: 'lighten',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '2px',
            maxWidth: '100%'
          }}/> 
        </div> 
        <div className="col-lg-6"> 
          <h1 className="display-5 fw-bold lh-1 mb-3" style={{ color: '#339af0' }}>Bharatiya Anthariksh Hackathon 2025</h1>
          <p className="lead text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec velit vulputate, lacinia libero in, elementum ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum blandit erat in est porta suscipit. Vivamus blandit leo id tempor cursus. Nulla facilisi. Etiam finibus vel nisi in elementum.</p> 
          <div className="d-grid gap-2 d-md-flex justify-content-md-start"> 
            <button type="button" className="btn btn-info text-dark btn-lg px-4 me-md-2">Primary</button> 
            <button type="button" className="btn btn-outline-light btn-lg px-4">Default</button> 
          </div> 
        </div> 
      </div> 
    </div>
  )
}

export default Hero