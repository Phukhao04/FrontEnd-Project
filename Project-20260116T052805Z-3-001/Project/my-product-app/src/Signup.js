import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSignup = async (e) => {
    e.preventDefault(); // Prevent page refresh
    const form = e.currentTarget; // Access the form element

    if (form.checkValidity() === false) {
      e.stopPropagation(); // Stop event propagation
    } else {
      try {
        const response = await fetch("http://localhost:5000/signup", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (data.success) {
          alert("Signup Successful!");
          navigate("/");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("เกิดข้อผิดพลาดในการสมัครสมาชิก");
      }
    }

    setValidated(true);
  };


  return (
    <div className="supersignup">

    <div className="container">

      <h2>Signup</h2>
      <Form noValidate validated={validated} onSubmit={onSignup}>
        <div className="formsignup-section">
          <Row >
            <Col>
              <Form.Group controlId="validateUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  กรุณากรอก Username
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="validateEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="formsingup-control"
                  required
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  กรุณากรอก Email
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="validatePassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  กรุณากรอก Password
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col className="register">
              <Button type="submit" className="mt-3">
                Register
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
    </div>
    );
}
