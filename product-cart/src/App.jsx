import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "iPhone 15",
    price: 69999,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 74999,
  },
  {
    id: 3,
    name: "OnePlus 12",
    price: 64999,
  },
  {
    id: 4,
    name: "Google Pixel 8",
    price: 59999,
  },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    const index = cart.findIndex((item) => item.id === id);

    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container">
      <h1>Mobile Store</h1>

      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <div className="phone">📱</div>

            <h2>{product.name}</h2>

            <p>₹{product.price.toLocaleString("en-IN")}</p>

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>🛒 Cart</h2>

        <p>Items: {cart.length}</p>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <span>{item.name}</span>

                <button onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}

            <h3>
              Total: ₹{total.toLocaleString("en-IN")}
            </h3>
          </>
        )}
      </div>
    </div>
  );
}

export default App;