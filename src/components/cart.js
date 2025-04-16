import React, { useEffect, useState } from "react";
import { fetchCartItems, updateCartItem, removeCartItem } from "./support"; 
import { useAuth } from '../utils/authContext';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();
  const userId = user?.id;  

  // Load cart from backend when userId is available
  useEffect(() => {
    if (!userId) return; // Prevent fetching if userId is not set

    const loadCart = async () => {
      try {
        const cartItems = await fetchCartItems(userId);
        setCart(cartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    loadCart();
  }, [userId]); // Runs when userId updates

  // Handle quantity change
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    await updateCartItem(userId, productId, newQuantity);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = async (productId) => {
    await removeCartItem(userId, productId);
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-10 mb-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.productId} className="flex items-center justify-between p-4 border-b">
              <img src={item.imageBase64} alt={item.name} className="w-16 h-16 rounded-lg" />
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">Price: ₹{item.price}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="px-3 py-1 border rounded-l bg-gray-200 hover:bg-gray-300"
                >
                  -
                </button>
                <input
                  type="text"
                  value={item.quantity}
                  readOnly
                  className="w-12 text-center border-t border-b"
                />
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="px-3 py-1 border rounded-r bg-gray-200 hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <p className="text-lg font-semibold text-gray-800 ml-4">₹{item.price * item.quantity}</p>
              <button
                onClick={() => removeItem(item.productId)}
                className="ml-4 text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-6">
            <h2 className="text-xl font-semibold">Total: ₹{totalPrice}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
