const { Cart } = require("./../models/cart");
const catchasync = require("./../utils/catchasync");
const _ = require("lodash");

//createCartItem
module.exports.createCartItem = catchasync(async function (req, res, next) {
  const { price, product } = _.pick(req.body, ["price", "product"]);

  const item = await Cart.findOne({
    user: req.user._id,
    product: product,
  });

  if (item) {
    return res.status(400).json({
      status: "Item already exists in Cart!",
    });
  }
  const cartItem = new Cart({
    price: price,
    product: product,
    user: req.user._id,
  });
  const result = await cartItem.save();
  res.status(201).json({
    status: "Added to cart successfully!!!",
    data: {
      result,
    },
  });
});

//getCartItem

module.exports.getCartItem = catchasync(async function (req, res, next) {
  const result = await Cart.find({
    user: req.user._id,
  });
  res.status(200).json({
    status: "Cart item find out successfully!!!",
    data: {
      result,
    },
  });
});

//update cartItem
module.exports.updateCartItem = catchasync(async function (req, res, next) {
  const { _id, count } = _.pick(req.body, ["count", "_id"]);
  const result = await Cart.updateOne(
    { _id: _id, user: req.user._id },
    { count: count }
  );
  res.status(200).json({
    status: "cartItem update successfully!!!",
    data: {
      result,
    },
  });
});
//delete cartItem
module.exports.deleteCartItem = catchasync(async function (req, res, next) {
  await Cart.deleteOne({ _id: req.params.id, user: req.user._id });
  res.status(204).json({
    status: "cartItem delete successfully!!!",
  });
});
//product purchase summary

module.exports.productPurchaseSummary = catchasync(async function (
  req,
  res,
  next
) {
  let arr = await Cart.aggregate([
    {
      $group: {
        _id: {
          month: { $month: "$updatedAt" },
          year: { $year: "$updatedAt" },
        },
        sum: { $sum: 1 },
      },
    },
  ]);
  if (!arr) {
    return next(new AppError("No Document found", 404));
  }
  let year = [2019, 2020, 2021, 2022, 2023];
  let newArr = [];
  let obj = {
    year: 0,
    jan: 0,
    feb: 0,
    mar: 0,
    april: 0,
    may: 0,
    jun: 0,
    jul: 0,
    aug: 0,
    sep: 0,
    oct: 0,
    nov: 0,
    dec: 0,
  };

  let arrleng = arr.length;
  let yearlen = year.length;

  for (let i = 0; i < yearlen; i++) {
    for (let j = 0; j < arrleng; j++) {
      if (year[i] === arr[j]._id.year) {
        let month = arr[j]._id.month;
        if (month === 1) {
          obj = {
            ...obj,
            year: arr[j]._id.year,
            jan: arr[j].sum,
          };
        } else if (month === 2) {
          obj = {
            ...obj,
            year: arr[j]._id.year,
            feb: arr[j].sum,
          };
        } else if (month === 3) {
          obj = {
            ...obj,
            year: arr[j]._id.year,
            mar: arr[j].sum,
          };
        } else if (month === 4) {
          obj = {
            ...obj,
            year: arr[j]._id.year,
            april: arr[j].sum,
          };
        } else if (month === 5) {
          obj = {
            ...obj,
            year: arr[j]._id.year,
            may: arr[j].sum,
          };
        } else if (month === 6) {
          obj = {
            ...obj,
            year: arr[j]._id.year,
            jun: arr[j].sum,
          };
        } else if (month === 7) {
          obj = {
            ...obj,
            year: arr[j]._id.year,
            jul: arr[j].sum,
          };
        } else if (month === 8) {
          obj = {
            ...obj,
            year: arr[j]._id.year,
            aug: arr[j].sum,
          };
        } else if (month === 9) {
          obj = {
            ...obj,
            year: arr[j]._id.year,
            sep: arr[j].sum,
          };
        } else if (month === 10) {
          obj = {
            ...obj,
            year: arr[j]._id.year,
            oct: arr[j].sum,
          };
        } else if (month === 11) {
          obj = {
            ...obj,
            year: arr[j]._id.year,
            nov: arr[j].sum,
          };
        } else if (month === 12) {
          obj = {
            ...obj,
            year: arr[j]._id.year,
            dec: arr[j].sum,
          };
        }
      }
    }
    newArr.push(obj);
    obj = {
      year: 0,
      jan: 0,
      feb: 0,
      mar: 0,
      april: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
    };
  }
  let finalArr = [];
  for (let k = 0; k < newArr.length; k++) {
    if (newArr[k].year === 0) {
    } else {
      finalArr.push(newArr[k]);
    }
  }
  //Report functionality end
  res.status(200).json({
    status: "success",
    data: finalArr,
  });
});
