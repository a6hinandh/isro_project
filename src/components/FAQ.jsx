import React, { useState } from 'react';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What services do you offer?",
      answer: "We provide comprehensive digital solutions including web development, mobile applications, cloud services, and digital transformation consulting. Our team specializes in creating scalable, modern solutions tailored to your business needs."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity and scope. Simple websites typically take 2-4 weeks, while complex applications can take 3-6 months. We provide detailed timelines during our initial consultation and keep you updated throughout the development process."
    },
    {
      question: "Do you provide ongoing support and maintenance?",
      answer: "Yes, we offer comprehensive support and maintenance packages to ensure your digital solutions remain secure, updated, and performing optimally. Our support includes regular updates, security monitoring, performance optimization, and technical assistance."
    },
    {
      question: "What is your development process?",
      answer: "Our development process follows agile methodologies with clear phases: discovery and planning, design and prototyping, development and testing, deployment, and ongoing support. We maintain transparent communication throughout each phase with regular updates and feedback sessions."
    },
    {
      question: "Can you work with existing systems?",
      answer: "Absolutely! We have extensive experience integrating with existing systems, databases, and third-party services. Whether you need to modernize legacy systems or enhance current infrastructure, we can create seamless solutions that work with your existing technology stack."
    }
  ];

  return (
    <section className="py-5" style={{
      color: '#f6f7fa',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(8px)',
      borderRadius: '15px',
      marginBottom: '30px',
      marginLeft: '100px', 
      marginRight: '100px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="container-fluid px-5">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2 className="fw-bold mb-3" style={{ 
              color: '#e599f7',
              fontSize: '2.5rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              Frequently Asked Questions
            </h2>
            <p style={{ 
              color: '#ffffff',
              fontSize: '1.1rem',
              opacity: '0.9'
            }}>
              Get answers to common questions about our services and process
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="accordion-container">
              {faqData.map((item, index) => (
                <div 
                  key={index}
                  className="accordion-item mb-3"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    boxShadow: activeIndex === index ? '0 8px 25px rgba(229, 153, 247, 0.2)' : '0 2px 10px rgba(0,0,0,0.1)'
                  }}
                >
                  <button
                    className="accordion-header w-100 text-start p-4 border-0"
                    onClick={() => toggleAccordion(index)}
                    style={{
                      backgroundColor: 'transparent',
                      color: '#ffffff',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(229, 153, 247, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span>{item.question}</span>
                    <div 
                      style={{
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: activeIndex === index ? '#e599f7' : 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        transition: 'all 0.3s ease',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: activeIndex === index ? '#000' : '#fff'
                      }}
                    >
                      {activeIndex === index ? '−' : '+'}
                    </div>
                  </button>
                  
                  <div 
                    className="accordion-collapse"
                    style={{
                      maxHeight: activeIndex === index ? '300px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease'
                    }}
                  >
                    <div 
                      className="accordion-body px-4 pb-4"
                      style={{
                        color: '#ffffff',
                        opacity: '0.9',
                        lineHeight: '1.6',
                        fontSize: '1rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        paddingTop: '1rem'
                      }}
                    >
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12 text-center">
            <p style={{ 
              color: '#ffffff',
              opacity: '0.8',
              marginBottom: '1rem'
            }}>
              Still have questions? We're here to help!
            </p>
            <button 
              className="btn px-4 py-2"
              style={{
                backgroundColor: '#e599f7',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(229, 153, 247, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#d580e6';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(229, 153, 247, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#e599f7';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(229, 153, 247, 0.3)';
              }}
            >
              Contact Us
            </button>
            <button 
              className="btn btn-outline-light ms-3 px-4 py-2"
              style={{
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              View All Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;