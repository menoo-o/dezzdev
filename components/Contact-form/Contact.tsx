import React from 'react';

function Contact() {
  return (
    <div className="contact-wrapper">
      <h1><span className="highlight">Get</span> in <strong>touch</strong></h1>

      <div className="form-grid">
        <div className="form-block">
          <label>Full name</label>
          <p>Fiona Wong</p>
        </div>

        <div className="form-block">
          <label>Email</label>
          <p>fionawong@gmail.com</p>
        </div>

        <div className="form-block">
          <label>Company</label>
          <p>Fifi Vintage</p>
        </div>

        <div className="form-block full-width">
          <label>Project details</label>
          <p>Tell me your goals</p>
        </div>

        <div className="form-block">
          <label>What can I do for you?</label>
          <div className="tags">
            <span>UGC</span>
            <span>Brand Photography</span>
            <span>Short-Form Video</span>
            <span>Content Strategy</span>
            <span>Identity</span>
            <span>Account Management</span>
            <span>Other</span>
          </div>
        </div>

        <div className="form-block">
          <label>Do you have a budget range?</label>
          <div className="tags">
            <span>Under $500</span>
            <span>$500–$1k</span>
            <span>$1k–$2.5k</span>
            <span>$2.5k–$5k</span>
            <span>$5k+</span>
          </div>
        </div>
      </div>

      <div className="submit-button">
        <button>
          <span>➤</span> Submit
        </button>
      </div>
    </div>
  );
}

export default Contact;
