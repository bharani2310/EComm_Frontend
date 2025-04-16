import React, { useState, useEffect, useRef } from "react";
import { fetchCategoriesWithProducts } from "./support";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const scrollContainerRefs = useRef({}); // Store multiple category refs

  useEffect(() => {
    loadCategoriesWithProducts();
  }, []);

  const loadCategoriesWithProducts = async () => {
    const data = await fetchCategoriesWithProducts();
    setCategories(data);
  };

  useEffect(() => {
    // Attach horizontal scroll event listener for each category container
    Object.values(scrollContainerRefs.current).forEach((scrollContainer) => {
      if (!scrollContainer) return;

      const handleWheelScroll = (event) => {
        event.preventDefault(); // Prevent vertical scrolling
        scrollContainer.scrollLeft += event.deltaY * 2; // Adjust speed
      };

      scrollContainer.addEventListener("wheel", handleWheelScroll);
      return () => scrollContainer.removeEventListener("wheel", handleWheelScroll);
    });
  }, [categories]);

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-100 min-h-screen m-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Product Categories
      </h1>

      {categories.length === 0 ? (
        <p className="text-center text-gray-500">No products available</p>
      ) : (
        categories.map((category) => (
          <div key={category.id} className="mb-8">
            <h2 className="text-2xl font-semibold mb-3 text-gray-700">
              {category.name}
            </h2>

            {/* Scrollable Product Container */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div
                ref={(el) => (scrollContainerRefs.current[category.id] = el)}
                className="overflow-x-auto flex gap-4 p-4 scrollbar-hide"
                style={{ whiteSpace: "nowrap", overflowX: "auto", scrollBehavior: "smooth" }}
              >
                {category.products.map((product) => (
                  <div
                    key={product.id}
                    className="border p-4 rounded-lg shadow-md w-64 bg-gray-50 hover:shadow-lg transition duration-300 cursor-pointer flex-shrink-0"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img
                      src={product.imageBase64}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <h3 className="mt-3 text-lg font-medium text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm">₹{product.price}</p>
                    <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
