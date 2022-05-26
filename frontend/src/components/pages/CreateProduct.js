import { useState, useEffect } from "react";
import { ErrorMsg, SuccessMsg } from "../../utils/Messages";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { userInfo } from "./../../utils/Auth";
import { createProduct } from "./../api/apiProduct";
import { ProductDetails } from "./../../redux/ProductActionCreators";
import { connect } from "react-redux";
//redux state
function mapStateToProps(state) {
  return state;
}

//redux dispatch
function mapDispatchToProps(dispatch) {
  return {
    ProductInfo: function () {
      return dispatch(ProductDetails());
    },
  };
}
//AddProduct Component
function CreateProduct(props) {
  const [values, setValues] = useState({
    name: "",
    price: "",
    error: "",
    success: "",
  });
  const { name, price, error, success } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      error: "",
      success: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { token } = userInfo();
    const { name, price } = values;
    const product = {
      name,
      price,
    };
    createProduct(token, product)
      .then((response) => {
        setValues({
          ...values,
          name: "",
          price: "",
          success: "Product Create is successfully!",
          error: "",
        });
        props.ProductInfo();
      })
      .catch((error) => {
        let errMsg = "Something went wrong!";
        if (error.response) errMsg = error.response.data.message;
        setValues({
          ...values,
          error: errMsg,
          success: "",
        });
      });
  };
  //addProductForm Form
  const addProductForm = () => (
    <div className="FormContainer">
      {/* showSuccess */}
      {SuccessMsg(success)}
      {/* showError */}
      {ErrorMsg(error)}
      <div className="FormContainer__text">
        <h5 className="heading-five">Add Product</h5>
      </div>
      <div className="FormContainer__form">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="loginemail">
            <Form.Control
              type="text"
              placeholder="Product Name"
              name="name"
              value={name}
              onChange={handleChange}
              required
              className="formControl-input"
            />
          </Form.Group>

          <Form.Group controlId="loginPassword">
            <Col>
              <Form.Control
                type="text"
                placeholder="Product Price"
                name="price"
                value={price}
                onChange={handleChange}
                required
                className="formControl-input"
              />
            </Col>
          </Form.Group>
          <Button variant="primary" type="submit" className="customBtn">
            Create Product
          </Button>
        </Form>
      </div>
    </div>
  );

  return (
    <Container>
      <Row>
        <Col>
          {/* addProductForm  code start */}
          {addProductForm()}
          {/* addProductForm code end */}
        </Col>
      </Row>
    </Container>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
