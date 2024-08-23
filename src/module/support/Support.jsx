import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaEnvelope, FaQuestionCircle } from 'react-icons/fa';
import { SiWhatsapp, SiFacebook, SiInstagram } from 'react-icons/si';
import '../../styles/support.css';

function Support() {
  const [faq, setFaq] = useState([
    {
      question: "How do I buy cryptocurrency?",
      answer: "You can buy cryptocurrency through exchanges like Coinbase, Binance, etc.",
      isOpen: false
    },
    {
      question: "How do I sell cryptocurrency?",
      answer: "You can sell cryptocurrency through exchanges where you have created an account.",
      isOpen: false
    },
    {
      question: "How do I keep my cryptocurrency safe?",
      answer: "Use secure wallets and enable two-factor authentication.",
      isOpen: false
    },
    {
      question: "What is a blockchain?",
      answer: "A blockchain is a decentralized digital ledger that records transactions across many computers.",
      isOpen: false
    },
    {
      question: "What are private keys and public keys?",
      answer: "Private keys are secret codes that allow you to spend your cryptocurrency. Public keys are addresses to receive cryptocurrency.",
      isOpen: false
    },
    {
      question: "What is a crypto wallet?",
      answer: "A crypto wallet is a digital wallet that stores your private and public keys and interacts with various blockchain networks to enable users to send and receive digital currency and monitor their balance.",
      isOpen: false
    },
    {
      question: "How do I recover my account if I forget my password?",
      answer: "Most exchanges and wallets offer a password recovery option via email. Make sure to follow their specific instructions.",
      isOpen: false
    },
    {
      question: "Can I use cryptocurrency for everyday purchases?",
      answer: "Yes, many merchants accept cryptocurrency as a form of payment. You can also use crypto debit cards.",
      isOpen: false
    }
  ]);

  const toggleFAQ = index => {
    setFaq(faq.map((item, i) => {
      if (i === index) {
        item.isOpen = !item.isOpen;
      } else {
        item.isOpen = false;
      }

      return item;
    }));
  };

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };
  return (
    <div className="container-fluid h-100 support-container">
      <div className="row page_content h-100">
        <div className="col-12 mt-2">
          <div className='row mt-4 px-4'>
            {/* Frequently Asked Questions */}
            <div className='col-12 col-lg-6 col-xl-5'>
              <div className="faq-section ">
                <div className="card-body" style={{ padding: 20 }}>
                  <h2><FaQuestionCircle /> Frequently Asked Questions</h2>
                  {faq.map((item, index) => (
                    <div key={index} className="faq-item">
                      <div className="faq-question" onClick={() => toggleFAQ(index)}>
                        {item.question}
                        {item.isOpen ? <FaChevronUp className="faq-icon" /> : <FaChevronDown className="faq-icon" />}
                      </div>
                      {item.isOpen && <div className="faq-answer">{item.answer}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Us */}
            <div className='col-12 col-lg-6 col-xl-5 offset-xl-1 '>
            <div className="contact-form-card card-shadow animate__animated animate__fadeInRight">
              <div className="card-body" style={{ padding: 20 }}>
                <h2><FaEnvelope /> Contact Us</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mt-2">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="message">Message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="3"
                      placeholder="Enter your message"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary mt-2">Submit</button>
                </form>
              </div>
            </div>
          </div>
       
   
   
          </div>
          <div className='row mt-4 px-4'>
            {/* Helpful Links */}
            <div className='col-6 col-lg-6 col-xl-6'>

              <div >
                <h2>Helpful Links</h2>
                <ul className="helpful-links">
                  <li><a href="/docs/getting-started">Getting Started with Cryptocurrency</a></li>
                  <li><a href="/docs/security">Cryptocurrency Security Tips</a></li>
                  <li><a href="/docs/troubleshooting">Troubleshooting Common Issues</a></li>
                </ul>
              </div>
            </div>
            {/* Social Links */}
            <div className='col-6 col-lg-6 col-xl-6'>
              <div className="social-links mt-4 d-flex justify-content-end">
                <a href="https://wa.me/yourphonenumber" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <SiWhatsapp size={30} />
                </a>
                <a href="https://facebook.com/yourprofile" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <SiFacebook size={30} />
                </a>
                <a href="https://instagram.com/yourprofile" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <SiInstagram size={30} />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Support;
