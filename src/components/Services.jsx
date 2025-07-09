import ForumIcon from '@mui/icons-material/Forum';
import SearchIcon from '@mui/icons-material/Search';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';

function Services() {
  return (
    <section className="py-5" style={{
      color: '#f6f7fa',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(8px)',
      borderRadius: '15px',
      marginBottom: '30px',
      marginLeft: '100px', marginRight: '100px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="container-fluid px-5">
        <div className="row text-center">
          {/* Service 1 */}
          <div className="col-lg-4 mb-4">
            <div className="bg-body-secondary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow" style={{ width: '140px', height: '140px' }}>
              <ForumIcon style={{ fontSize: '4rem', color: '#e599f7' }} />
            </div>
            <h2 className="fw-semibold" style={{ color: '#e599f7' }}>Conversational Access to ISRO’s Satellite Knowledge</h2>
            <p style={{ color: '#ffffff' }}>
              We provide a natural language interface for researchers, students, and professionals to interact with complex satellite data and scientific content through simple, intuitive conversations
            </p>
          </div>

          {/* Service 2 */}
          <div className="col-lg-4 mb-4">
            <div className="bg-body-secondary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow" style={{ width: '140px', height: '140px' }}>
              <SearchIcon style={{ fontSize: '4rem', color: '#e599f7' }} />
            </div>
            <h2 className="fw-semibold" style={{ color: '#e599f7' }}>On-Demand Scientific Information Retrieval</h2>
            <p style={{ color: '#ffffff' }}>
              Astra-Q enables users to instantly retrieve targeted insights from a wide range of ISRO documents, datasets, FAQs, and satellite product archives — all without manual searching
            </p>
          </div>

          {/* Service 3 */}
          <div className="col-lg-4 mb-4">
            <div className="bg-body-secondary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow" style={{ width: '140px', height: '140px' }}>
              <SettingsEthernetIcon style={{ fontSize: '4rem', color: '#e599f7' }} />
            </div>
            <h2 className="fw-semibold" style={{ color: '#e599f7' }}>Customizable Integration with Satellite Products and APIs</h2>
            <p style={{ color: '#ffffff' }}>
              We offer optional integration with live satellite data APIs and product visualizations, enabling dynamic interaction with spatial datasets and time-based analysis tools
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
