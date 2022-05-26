const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      unique: true,
      maxlength: [
        40,
        "A product name must have less or equal than 40 characters",
      ],
      minlength: [
        3,
        "A product name must have more or equal than 10 characters",
      ],
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
