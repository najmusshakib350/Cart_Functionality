import { useEffect, useState } from "react";
import { ProductDetails } from "./../../redux/ProductActionCreators";
import { connect } from "react-redux";
import { Container, Row, Col, Table } from "react-bootstrap";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";
import * as FaIcons from "react-icons/fa";
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
//ProductDetailsComponent Component
function ProductDetailsComponent(props) {
  const { productInfo } = props;

  //Update Modal code start
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const handleClose = () => {
    setId("");
    setShow(false);
  };
  const handleShow = (e, id) => {
    setId(id);
    setShow(true);
  };
  //Update Modal code end
  //Delete Modal code start
  const [showD, setShowD] = useState(false);
  const [idD, setIdD] = useState("");
  const handleCloseD = () => {
    setIdD("");
    setShowD(false);
  };
  const handleShowD = (e, id) => {
    setIdD(id);
    setShowD(true);
  };
  //Upd
  //Delete Modal code end
  //useEffect hook
  useEffect(function () {
    props.ProductInfo();
  }, []);
  //InfoDetails
  function InfoDetails() {
    if (productInfo.product.length !== 0) {
      return productInfo.product.map((el, i) => {
        i = 1 + i;
        return (
          <tr key={Math.random() + i + "product"}>
            <td className="table_columnddata">{i}</td>
            <td className="table_columnddata">{el.name}</td>
            <td className="table_columnddata">{el.price}</td>
            <td className="table_columnddata">
              <FaIcons.FaPencilAlt
                className="product-icon"
                onClick={(e) => handleShow(e, el._id)}
              />
              <FaIcons.FaTrash
                className="product-icon"
                onClick={(e) => handleShowD(e, el._id)}
              />
            </td>
          </tr>
        );
      });
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Col>
            <h5 className="heading-five text-center mt-3">Product Details</h5>
          </Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th className="table_columnHeaddata">SN</th>
                <th className="table_columnHeaddata">Name</th>
                <th className="table_columnHeaddata">Price</th>
                <th className="table_columnHeaddata">Action</th>
              </tr>
            </thead>
            <tbody>{InfoDetails()}</tbody>
            <UpdateProduct show={show} handleClose={handleClose} id={id} />
            <DeleteProduct
              showD={showD}
              handleCloseD={handleCloseD}
              idD={idD}
            />
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailsComponent);
