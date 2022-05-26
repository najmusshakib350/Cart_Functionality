const Product = require("./../models/product");
const AppError = require("./../utils/apperror");
const catchasync = require("./../utils/catchasync");

//createProduct
module.exports.createProduct = catchasync(async function (req, res, next) {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      doc: product,
    },
  });
});

//getAllProducts
module.exports.getAllProducts = catchasync(async function (req, res, next) {
  const product = await Product.find({});
  res.status(200).json({
    status: "success",
    data: {
      doc: product,
    },
  });
});

//updateOneProduct
module.exports.updateOneProduct = catchasync(async function (req, res, next) {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new AppError("No Document found with that Id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      doc: product,
    },
  });
});

//DeleteOneProduct
module.exports.deleteOneProduct = catchasync(async function (req, res, next) {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new AppError("No Document found with that Id", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
