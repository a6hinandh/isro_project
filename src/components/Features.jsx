import icon from '../assets/rocket-of-icon-black-vector-21468678.jpg'

function Features() {
  return (
    <div className="container px-4 py-5" id="hanging-icons"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(8px)',
        borderRadius: '15px',
        marginBottom: '30px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}    
    > 
      <h2 className="pb-2 border-bottom text-white">Features</h2> 
      <div className="row g-4 py-5 row-cols-1 row-cols-lg-3"> 
        <div className="col d-flex align-items-start"> 
          <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"> 
            <img src={icon} alt="Tools Icon" className="bg-body-secondary rounded-circle p-2 shadow" style={{ width: '2.5rem', height: '2.5rem' }} />
          </div> 
          <div> 
            <h3 className="fs-3 fw-semibold" style={{ color: '#4dabf7' }}>Fast Setup</h3>
            <p className='text-white'>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
            <a href="#" className="btn btn-primary">Primary button</a> 
          </div> 
        </div> 
        <div className="col d-flex align-items-start"> 
          <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"> 
            <img src={icon} alt="Tools Icon" className="bg-body-secondary rounded-circle p-2 shadow" style={{ width: '2.5rem', height: '2.5rem' }} /> 
          </div> 
          <div> 
            <h3 className="fs-3 fw-semibold" style={{ color: '#4dabf7' }}>Fast Setup</h3>
            <p className='text-white'>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p> 
            <a href="#" className="btn btn-primary">Primary button</a> 
          </div> 
        </div> 
        <div className="col d-flex align-items-start"> 
          <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"> 
            <img src={icon} alt="Tools Icon" className="bg-body-secondary rounded-circle p-2 shadow" style={{ width: '2.5rem', height: '2.5rem' }} /> 
          </div> 
          <div> 
            <h3 className="fs-3 fw-semibold" style={{ color: '#4dabf7' }}>Fast Setup</h3>
            <p className='text-white'>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p> 
            <a href="#" className="btn btn-primary">Primary button</a> 
          </div> 
        </div> 
      </div>
    </div>
  )
}

export default Features