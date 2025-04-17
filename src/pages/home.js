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
    console.log("data", data);
    setCategories(data);
  };

  useEffect(() => {
    const scrollContainers = scrollContainerRefs.current;

    const handleWheelScroll = (event, container) => {
      if (!container) return;
      event.preventDefault();
      container.scrollLeft += event.deltaY * 2;
    };

    // Attach listeners
    Object.entries(scrollContainers).forEach(([id, container]) => {
      if (!container) return;
      const listener = (e) => handleWheelScroll(e, container);
      container.addEventListener("wheel", listener, { passive: false });
      container._wheelListener = listener; // save listener for cleanup
    });

    // Cleanup
    return () => {
      Object.entries(scrollContainers).forEach(([id, container]) => {
        if (container && container._wheelListener) {
          container.removeEventListener("wheel", container._wheelListener);
          delete container._wheelListener;
        }
      });
    };
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
          <div key={category._id} className="mb-8">
            <h2 className="text-2xl font-semibold mb-3 text-gray-700">
              {category.name}
            </h2>

            {/* Scrollable Product Container */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div
                ref={(el) => {
                  if (el) {
                    scrollContainerRefs.current[category._id] = el;
                  } else {
                    delete scrollContainerRefs.current[category._id];
                  }
                }}
                className="overflow-x-auto flex gap-4 p-4 scrollbar-hide"
                style={{
                  whiteSpace: "nowrap",
                  overflowX: "auto",
                  scrollBehavior: "smooth",
                }}
              >
                {category.products.length === 0 ? (
                  <p className="text-gray-500">No products in this category.</p>
                ) : (
                  category.products.map((product) => (
                    <div
                      key={product._id}
                      className="border p-4 rounded-lg shadow-md w-64 bg-gray-50 hover:shadow-lg transition duration-300 cursor-pointer flex-shrink-0"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      <img
                        src={product.imageBase64}
                        alt={product.name}
                        className="w-full h-40 object-cover rounded-lg"
                        onError={(e) => (e.target.src = "/placeholder.png")}
                      />
                      <h3 className="mt-3 text-lg font-medium text-gray-800">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm">₹{product.price}</p>
                      <p className="text-sm text-gray-500">
                        Stock: {product.stock}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
