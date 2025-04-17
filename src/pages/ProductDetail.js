import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "./support";
import { addToCart } from "../components/support"; 
import { AiOutlineArrowLeft } from "react-icons/ai"; 
import { FaShoppingCart } from "react-icons/fa"; 
import { FiMinus, FiPlus } from "react-icons/fi"; 
import toast from "react-hot-toast";
import { useAuth } from "../utils/authContext";

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from auth context

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const data = await fetchProductById(id);
    setProduct(data);
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("You must be logged in to add items to the cart!");
      navigate("/login"); // Redirect to login page if not logged in
      return;
    }

    if (!product) return;

    try {
      await addToCart(user.id, {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity,
        imageBase64: product.imageBase64,
      });

      toast.success(`${quantity} x ${product.name} added to cart!`);
    } catch (error) {
      toast.error("Failed to add to cart.");
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) {
    return <p className="text-center mt-10">Loading product details...</p>;
  }

  const totalAmount = product.price * quantity;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 mb-10 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition duration-300"
      >
        <AiOutlineArrowLeft className="w-6 h-6" />
        <span className="text-lg">Back</span>
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{product.name}</h1>
      <img src={product.imageBase64} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
      <p className="text-xl text-gray-700 mt-4 font-semibold">Price: ₹{product.price}</p>
      <p className="text-md text-gray-600">Stock: {product.stock}</p>
      <p className="text-md text-gray-500 mt-2">
        Unit: {product.unit} | Weight: {product.actualWeight}kg
      </p>

      <div className="flex items-center justify-center mt-6 space-x-4">
        <button onClick={decreaseQuantity} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300">
          <FiMinus className="w-5 h-5" />
        </button>
        <span className="text-lg font-semibold">{quantity}</span>
        <button onClick={increaseQuantity} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300">
          <FiPlus className="w-5 h-5" />
        </button>
      </div>

      <p className="text-lg font-semibold text-center mt-4">
        Total Amount: <span className="text-blue-600">₹{totalAmount.toFixed(2)}</span>
      </p>

      <button
        onClick={handleAddToCart}
        className={`mt-6 w-full flex items-center justify-center py-3 rounded-lg text-lg font-semibold shadow-md transition duration-300 ${
          user ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
      >
        <FaShoppingCart className="mr-2" /> Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
