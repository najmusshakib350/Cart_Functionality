import { useEffect, useState } from "react";
import { ErrorMsg, SuccessMsg } from "./../../utils/Messages";
import { Navigate } from "react-router-dom";
import { isAuthenticated, authenticate } from "./../../utils/Auth";
import { login } from "./../api/apiUser";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

//Login Component
function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
  });
  const { email, password, error, success } = values;
  //useEffect Hook
  useEffect(function () {
    document.title = "Login Page";
  }, []);

  //signInFormhandleChange
  const signInFormhandleChange = (e) => {
    let user = {
      ...values,
      [e.target.name]: e.target.value,
      success: "",
    };
    setValues(user);
  };
  //signInFormSubmit
  const signInFormSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", success: "" });
    login({ email, password })
      .then((response) => {
        authenticate(response.data.token, () => {
          setValues({
            email: "",
            password: "",
            success: response.data.message,
            error: "",
          });
        });
      })
      .catch((err) => {
        let errMsg = "Something went wrong!";
        if (err.response) {
          errMsg = err.response.data.message;
        } else {
          errMsg = "Something went wrong!";
        }
        setValues({
          ...values,
          error: errMsg,
          success: "",
        });
      });
  };

  //SignIn Form
  const signInForm = () => (
    <div className="FormContainer">
      {/* showSuccess */}
      {SuccessMsg(success)}
      {/* showError */}
      {ErrorMsg(error)}

      <div className="FormContainer__text">
        <h5 className="heading-five">Login your account</h5>
      </div>
      <div className="FormContainer__form">
        <Form onSubmit={signInFormSubmit}>
          <Form.Group controlId="loginemail">
            <Form.Control
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={email}
              onChange={signInFormhandleChange}
              required
              className="formControl-input"
            />
          </Form.Group>

          <Form.Group controlId="loginPassword">
            <Col>
              <Form.Control
                type="password"
                placeholder="Enter Your Password"
                name="password"
                value={password}
                onChange={signInFormhandleChange}
                required
                className="formControl-input"
              />
            </Col>
          </Form.Group>
          <Button variant="primary" type="submit" className="customBtn">
            Log in
          </Button>
        </Form>
      </div>
    </div>
  );

  //RedirectUser
  const RedirectUser = () => {
    const auth = isAuthenticated();
    if (auth) {
      return <Navigate to={`/product`} />;
    }
  };

  return (
    <Container className="logincontainer">
      <Row className="logincontainer__row">
        <Col className="logincontainer__col">
          {/* RedirectUser */}
          {RedirectUser()}

          {/* SignIn Form code start */}
          {signInForm()}
          {/* SignIn Form code end */}
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
