import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { ProductDetails } from "./../../redux/ProductActionCreators";
import { connect } from "react-redux";
import Layout from "../Layout";
import { isAuthenticated, userInfo } from "./../../utils/Auth";
import { addToCart } from "./../api/apiOrder";
import { ErrorMsg, SuccessMsg } from "../../utils/Messages";

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
//Sales Component
function Sales(props) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { productInfo } = props;
  //useEffect hook
  useEffect(function () {
    props.ProductInfo();
  }, []);
  //handleAddToCart

  const handleAddToCart = (product) => () => {
    if (isAuthenticated()) {
      setError("");
      setSuccess("");
      const user = userInfo();
      const cartItem = {
        user: user.id,
        product: product._id,
        price: product.price,
      };
      addToCart(user.token, cartItem)
        .then((response) => {
          setSuccess(response.data.status);
        })
        .catch((err) => {
          if (err.response) setError(err.response.data.status);
          else setError("Adding to cart failed!");
        });
    } else {
      setSuccess("");
      setError("Please Login First!");
    }
  };
  //CardFn
  function CardFn() {
    if (productInfo.product.length !== 0) {
      return productInfo.product.map((el, i) => {
        return (
          <Card
            style={{ width: "24%", marginBottom: "1%" }}
            key={Math.random() + i + "sales"}
            className="card"
          >
            <Card.Body>
              <Card.Title className="heading-six">{el.name}</Card.Title>
              <Card.Text className="paragraph">{el.price}</Card.Text>
              <Button
                variant="primary"
                onClick={handleAddToCart(el)}
                className="customBtn"
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        );
      });
    }
  }
  return (
    <Layout title="Sales Page">
      <Container>
        <Row>
          <Col>
            {ErrorMsg(error)}
            {SuccessMsg(success)}
            <div className="cardContainer">{CardFn()}</div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Sales);
