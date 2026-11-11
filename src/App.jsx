
import { useState } from "react";
import "./App.css";

function App() {

  // Our sample products
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 2499,
      emoji: "🎧"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 3999,
      emoji: "⌚"
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 2999,
      emoji: "👟"
    },
    {
      id: 4,
      name: "Travel Backpack",
      price: 1499,
      emoji: "🎒"
    }
  ];

  // React remembers the number of cart items
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Search input state
  const [search, setSearch] = useState("");

  // Add product to cart
  function addToCart(product) {
  setCart((previousCart) => {

    // Check whether product already exists
    const existingProduct = previousCart.find(
      (item) => item.id === product.id
    );

    // If it exists, increase quantity
    if (existingProduct) {
      return previousCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    // If it is new, add it with quantity 1
    return [
      ...previousCart,
      { ...product, quantity: 1 }
    ];
  });
}

  // Filter products using search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
const cartCount = cart.reduce(
  (total, item) => total + item.quantity,
  0
);

const cartTotal = cart.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

return (
  <div className="app">

    {/* Navigation bar */}
    <nav className="navbar">
      <h1>ShopEasy 🛍️</h1>

      <button
        className="cart"
        onClick={() => setIsCartOpen(!isCartOpen)}
      >
        🛒 Cart: {cartCount}
      </button>
    </nav>

    {/* Shopping Cart Section */}
    {isCartOpen && (
      <section className="cart-panel">

        <h2>My Shopping Cart 🛒</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty!</p>
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

                <button
                  onClick={() =>
                    setCart((previousCart) =>
                      previousCart.filter(
                        (product) => product.id !== item.id
                      )
                    )
                  }
                >
                  Remove
                </button>

              </div>
            ))}

            <h3>Grand Total: ₹{cartTotal}</h3>
          </>
        )}

        <button onClick={() => setIsCartOpen(false)}>
          Continue Shopping
        </button>

      </section>
    )}

    {/* Welcome section */}
    <section className="hero">
      <h2>Welcome to ShopEasy</h2>
      <p>Find your favourite products at great prices.</p>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </section>

    {/* Product section */}
    <section className="products">
      <h2>Our Products</h2>

      <div className="product-grid">

        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>

            <div className="product-image">
              {product.emoji}
            </div>

            <h3>{product.name}</h3>

            <p>₹{product.price}</p>

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>

          </div>
        ))}

        {filteredProducts.length === 0 && (
          <p>No products found!</p>
        )}

      </div>
    </section>

  </div>
);
}

export default App;
