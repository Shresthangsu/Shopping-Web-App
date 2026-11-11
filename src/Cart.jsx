
function Cart({ cart, setCart }) {

  // Calculate total number of products
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total price
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Remove a product
  function removeProduct(id) {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  }

  // Change product quantity
  function changeQuantity(id, amount) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  return (
    <div className="cart-page">

      <h1>My Shopping Cart 🛒</h1>

      <p>Total items: {cartCount}</p>

      {cart.length === 0 ? (
        <h2>Your cart is empty!</h2>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>

              <div>
                <h3>{item.emoji} {item.name}</h3>

                <p>Price: ₹{item.price}</p>

                <p>Quantity: {item.quantity}</p>

                <p>
                  Subtotal: ₹{item.price * item.quantity}
                </p>
              </div>

              <div className="quantity-buttons">
                <button onClick={() => changeQuantity(item.id, -1)}>
                  −
                </button>

                <button onClick={() => changeQuantity(item.id, 1)}>
                  +
                </button>

                <button onClick={() => removeProduct(item.id)}>
                  Remove
                </button>
              </div>

            </div>
          ))}

          <h2>Grand Total: ₹{cartTotal}</h2>

          <button className="checkout-button">
            Proceed to Checkout
          </button>
        </>
      )}

    </div>
  );
}

export default Cart;
