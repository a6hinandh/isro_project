import RocketIcon from '@mui/icons-material/RocketLaunch';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';

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
        {/* Feature 1 */}
        <div className="col d-flex align-items-start"> 
          <div className="icon-square text-white bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3 rounded-circle p-2 shadow" style={{ width: '3rem', height: '3rem' }}>
            <RocketIcon style={{ fontSize: '2rem', color: '#4dabf7' }} />
          </div> 
          <div> 
            <h3 className="fs-3 fw-semibold" style={{ color: '#4dabf7' }}>Natural Language Access to Satellite Data</h3>
            <p className='text-white'>Ask complex scientific questions in plain English — get accurate answers from ISRO’s satellite datasets and documents</p>
          </div> 
        </div> 

        {/* Feature 2 */}
        <div className="col d-flex align-items-start"> 
          <div className="icon-square text-white bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3 rounded-circle p-2 shadow" style={{ width: '3rem', height: '3rem' }}>
            <PsychologyAltIcon style={{ fontSize: '2rem', color: '#4dabf7' }} />
          </div> 
          <div> 
            <h3 className="fs-3 fw-semibold" style={{ color: '#4dabf7' }}>Semantic Search with Knowledge Graph Reasoning</h3>
            <p className='text-white'>Goes beyond keyword matching by understanding the meaning behind queries and retrieving contextually relevant information</p> 
          </div> 
        </div> 

        {/* Feature 3 */}
        <div className="col d-flex align-items-start"> 
          <div className="icon-square text-white bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3 rounded-circle p-2 shadow" style={{ width: '3rem', height: '3rem' }}>
            <AutoAwesomeMotionIcon style={{ fontSize: '2rem', color: '#4dabf7' }} />
          </div> 
          <div> 
            <h3 className="fs-3 fw-semibold" style={{ color: '#4dabf7' }}>Unified Access to Structured & Unstructured Data</h3>
            <p className='text-white'>Retrieves information from PDFs, APIs, graphs, and metadata — all through a single conversational interface</p> 
          </div> 
        </div> 
      </div>
    </div>
  );
}

export default Features;
