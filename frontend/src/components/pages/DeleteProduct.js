import { Modal, Button } from "react-bootstrap";
import { userInfo } from "./../../utils/Auth";
import { connect } from "react-redux";
import { ProductDetails } from "./../../redux/ProductActionCreators";
import { deleteProduct } from "./../api/apiProduct";
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

function DeleteProduct(props) {
  const { idD } = props;
  //handleSubmit function
  function handleSubmit(e) {
    e.preventDefault();
    const { token } = userInfo();
    deleteProduct(token, idD)
      .then((response) => {
        props.handleCloseD();
        props.ProductInfo();
      })
      .catch((error) => {});
  }
  return (
    <Modal show={props.showD} onHide={props.handleCloseD}>
      <Modal.Header closeButton>
        <Modal.Title className="heading-five mb-0">
          Do you want to delete this product?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button
          variant="secondary"
          className=" customBtn"
          onClick={props.handleCloseD}
        >
          Close
        </Button>
        <Button
          variant="secondary"
          className=" customBtn closeCustomBtn mt-3"
          onClick={handleSubmit}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProduct);
