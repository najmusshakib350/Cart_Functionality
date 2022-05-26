import { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { userInfo } from "./../../utils/Auth";
import { connect } from "react-redux";
import { ProductDetails } from "./../../redux/ProductActionCreators";
import { updateProduct } from "./../api/apiProduct";
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

function UpdateProduct(props) {
  const [values, setValues] = useState({
    name: "",
    price: "",
  });
  let { name, price } = values;
  const { productInfo, id } = props;
  //Find One Product
  let oneProduct = productInfo.product.find((el, i) => {
    return el._id === id;
  });
  //useEffect hook
  useEffect(() => {
    if (oneProduct !== undefined) {
      setValues({
        name: oneProduct.name,
        price: oneProduct.price,
      });
    }
  }, [oneProduct]);
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
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
    updateProduct(token, product, id)
      .then((response) => {
        setValues({
          ...values,
          name: "",
          price: "",
        });
        props.handleClose();
        props.ProductInfo();
      })
      .catch((error) => {});
  };

  //UpdateProductForm
  function UpdateProductForm() {
    return (
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="updateName">
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              required
              className="formControl-input"
            />
          </Form.Group>

          <Form.Group controlId="updatePrice">
            <Col>
              <Form.Control
                type="text"
                name="price"
                value={price}
                onChange={handleChange}
                required
                className="formControl-input"
              />
            </Col>
          </Form.Group>
          <Button variant="primary" type="submit" className="customBtn">
            Update Product
          </Button>
        </Form>
      </div>
    );
  }
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="heading-five mb-0">Update Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>{UpdateProductForm()}</Modal.Body>
      <Modal.Footer>
        <Button
          className=" customBtn closeCustomBtn"
          onClick={props.handleClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);
