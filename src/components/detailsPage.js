import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  if (!item) {
    return <p className="text-center text-red-500 mt-10">No item details found.</p>;
  }

  console.log("Selected Item:", item);

  // If item is a category, show all products in that category, otherwise show the single product
  const products = item.type === "category" ? item.products || [] : [item];

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{item.name}</h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-md bg-gray-50 cursor-pointer hover:bg-gray-100 transition duration-300"
              onClick={() => navigate(`/product/${product.id}`, { state: { item: product } })}
            >
              <img
                src={`${product.imageBase64}`}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-700">Price: ₹{product.price}</p>
              <p className="text-gray-700">Stock: {product.stock} left</p>
              <p className="text-gray-700">Weight: {product.actualWeight} {product.unit}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No products available.</p>
      )}

      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
};

export default DetailsPage;
