import React, { useState } from "react";
import {
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBTextArea,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBContainer,
  MDBSpinner,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    copy: false,
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setFeedback({ type: "success", message: "Message sent successfully!" });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        copy: false,
      });
    }, 1500);
  };

  return (
    <div
      className="py-5"
      style={{
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        minHeight: "80vh",
      }}
    >
      <MDBContainer>
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol md="8" sm="12">
            <MDBCard className="shadow-lg rounded-4 p-4">
              <MDBCardBody>
                <MDBCardTitle className="text-center mb-4">
                  <h2 className="fw-bold text-primary">📩 Contact Us</h2>
                  <p className="text-muted mb-0">
                    Have a question or feedback? Fill out the form and we'll get back to you shortly.
                  </p>
                </MDBCardTitle>

                {feedback && (
                  <div
                    className={`alert alert-${feedback.type === "success" ? "success" : "danger"} text-center rounded-3`}
                    role="alert"
                  >
                    {feedback.message}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <MDBInput
                    name="name"
                    label="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    wrapperClass="mb-3"
                    required
                  />

                  <MDBInput
                    type="email"
                    name="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    wrapperClass="mb-3"
                    required
                  />

                  <MDBInput
                    name="subject"
                    label="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    wrapperClass="mb-3"
                  />

                  <MDBTextArea
                    name="message"
                    label="Message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    wrapperClass="mb-3"
                    required
                  />

                  <MDBCheckbox
                    name="copy"
                    checked={formData.copy}
                    onChange={handleChange}
                    wrapperClass="d-flex justify-content-start mb-3"
                    label="Send me a copy of this message"
                  />

                  <div className="text-center">
                    <MDBBtn
                      color="primary"
                      size="lg"
                      className="px-5 w-100"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? <MDBSpinner size="sm" grow /> : "Send Message"}
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
