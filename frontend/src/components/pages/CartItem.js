import React from "react";

const CartItem = ({ item, serial, increaseItem, decreaseItem, removeItem }) => {
  return (
    <tr>
      <td scope="row" className="table_columnddata">
        {serial}
      </td>
      <td className="table_columnddata">
        {item.product ? item.product.name : ""}
      </td>
      <td className="table_columnddata">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={decreaseItem}
        >
          -
        </button>
        &nbsp;&nbsp;{item.count}&nbsp;&nbsp;
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={increaseItem}
        >
          +
        </button>
      </td>
      <td align="right" className="table_columnddata">
        ৳ {item.price * item.count}{" "}
      </td>
      <td className="table_columnddata">
        <button className="btn btn-danger btn-sm" onClick={removeItem}>
          Remove From Cart
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
