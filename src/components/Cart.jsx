import React, { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartItem from "./CartItem";
import UserProgressContext from "../store/UserProgressContext";
import { CartContext } from "../store/CartContext";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function closeCartHandler() {
    userProgressCtx.hideCart();
  }

  function openCheckoutHandler() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? closeCartHandler : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            onDecrease={() => cartCtx.removeItems(item.id)}
            onIncrease={() => cartCtx.addItems(item)}
            {...item}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={closeCartHandler}>Close</Button>
        {cartCtx.items.length > 0 && (<Button onClick={openCheckoutHandler}>Go To Checkout</Button>)}
      </p>
    </Modal>
  );
}
