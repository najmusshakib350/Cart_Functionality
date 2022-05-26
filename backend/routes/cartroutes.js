const router = require("express").Router();
const {
  createCartItem,
  getCartItem,
  updateCartItem,
  deleteCartItem,
  productPurchaseSummary,
} = require("../controllers/cartcontroller");
const { protect } = require("../controllers/usercontroller");

router
  .route("/")
  .get(protect, getCartItem)
  .post(protect, createCartItem)
  .put(protect, updateCartItem);

router.route("/:id").delete(protect, deleteCartItem);
router.route("/purchase/summary").get(protect, productPurchaseSummary);

module.exports = router;
