const express = require("express");
const {
  createProduct,
  getAllProducts,
  updateOneProduct,
  deleteOneProduct,
} = require("./../controllers/productcontroller");
const { protect } = require("../controllers/usercontroller");
const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/:id").delete(protect, deleteOneProduct);
router.route("/:id").patch(protect, updateOneProduct);
router.route("/create").post(protect, createProduct);

module.exports = router;
