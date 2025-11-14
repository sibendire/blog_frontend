
import React, { useState } from "react";
import "../cssComponent/ContactForm.css"; // We'll use a separate CSS file

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    copy: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    alert("Form submitted!");
    setFormData({ name: "", email: "", subject: "", message: "", copy: false });
  };

  return (
    <div className="contact-container">
      <h2 className="section-title">📩 Contact Us</h2>
      <p className="text-dark">
        Have a question or feedback? Fill out the form and we'll get back to you
        shortly.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
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

        <div className="mb-2">
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <input
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            placeholder="Enter subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="4"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="copyCheck"
            name="copy"
            checked={formData.copy}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="copyCheck">
            Send me a copy of this message
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit Message
        </button>
      </form>
    </div>
  );
}
