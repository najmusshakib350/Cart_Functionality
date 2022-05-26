import { useState, useEffect } from "react";
import Layout from "./../Layout";
import CartItem from "./CartItem";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";
import {
  getCartItems,
  updateCartItems,
  deleteCartItem,
} from "./../api/apiOrder";
import { userInfo } from "./../../utils/Auth";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = () => {
    getCartItems(userInfo().token)
      .then((response) => setCartItems(response.data.data.result))
      .catch(() => {});
  };
  useEffect(() => {
    loadCart();
  }, []);

  const increaseItem = (item) => () => {
    if (item.count === 5) return;
    const cartItem = {
      ...item,
      count: item.count + 1,
    };
    updateCartItems(userInfo().token, cartItem)
      .then((response) => loadCart())
      .catch((err) => {});
  };

  const getCartTotal = () => {
    const arr = cartItems.map((item) => item.price * item.count);
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum;
  };

  const decreaseItem = (item) => () => {
    if (item.count === 1) return;
    const cartItem = {
      ...item,
      count: item.count - 1,
    };
    updateCartItems(userInfo().token, cartItem)
      .then((response) => loadCart())
      .catch((err) => {});
  };

  const removeItem = (item) => () => {
    if (!window.confirm("Delete Item?")) return;
    deleteCartItem(userInfo().token, item)
      .then((response) => {
        loadCart();
      })
      .catch(() => {});
  };

  function CheckoutFn() {
    return window.confirm("Product purchase is successfully!");
  }

  return (
    <Layout title="Cart Page">
      <Container>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="table_columnHeaddata">SN</th>
                  <th className="table_columnHeaddata">Product Name</th>
                  <th className="table_columnHeaddata">Quantity</th>
                  <th className="table_columnHeaddata">Price</th>
                  <th className="table_columnHeaddata">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, i) => (
                  <CartItem
                    item={item}
                    serial={i + 1}
                    key={item._id}
                    increaseItem={increaseItem(item)}
                    decreaseItem={decreaseItem(item)}
                    removeItem={removeItem(item)}
                  />
                ))}
                <tr>
                  <td colSpan={4} className="table_columnddata">
                    Total
                  </td>
                  <td align="right" className="table_columnddata">
                    ৳ {getCartTotal()}{" "}
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="table_columnddata">
                    <NavLink to="/sales" style={{ marginRight: "2rem" }}>
                      <button className="mr-4 customBtn cartBtn">
                        Continue Shoping
                      </button>
                    </NavLink>
                    <button
                      to="/shipping"
                      className="mr-4 customBtn cartBtn"
                      onClick={CheckoutFn}
                    >
                      Proceed To Checkout
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Cart;
