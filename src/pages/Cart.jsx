import React from "react";
import { useCartStore } from "../store/cartStore";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const Cart = () => {
  const { cartItems, removeFromCart } = useCartStore();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl text-center mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 mt-5">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div className="grid">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="col-12 sm:col-6 md:col-4 lg:col-3"
            >
              <Card
                title={item.name}
                subTitle={`$${item.price} x ${item.quantity}`}
                className="mb-3 shadow-2 border-round"
              >
                <div className="flex justify-content-between align-items-center">
                  <span>Total: ${item.price * item.quantity}</span>
                  <Button
                    icon="pi pi-trash"
                    severity="danger"
                    onClick={() => removeFromCart(item._id)}
                  />
                </div>
              </Card>
            </div>
          ))}

          {/* Total Summary Card */}
          <div className="col-12">
            <Card className="shadow-2 border-round">
              <h4>Total Amount: ${totalAmount.toFixed(2)}</h4>
              <Button
                label="Proceed to Checkout"
                icon="pi pi-credit-card"
                className="mt-2"
                disabled
              />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
