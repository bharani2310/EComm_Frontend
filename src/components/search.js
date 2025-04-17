import React, { useState, useEffect, useRef } from "react";
import { fetchItems } from "./support"; // Function to fetch items from backend
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Fetch search suggestions with a debounce effect
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() === "") {
        setSuggestions([]);
        return;
      }
      const results = await fetchItems(query); // Fetch items from API
      console.log("resu", results);
      setSuggestions(results);
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimeout);
  }, [query]);

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle item click (redirect based on type)
  const handleItemClick = (item) => {
    console.log("Selected Item:", item);

    if (item.type === "product") {
      navigate(`/product/${item._id}`, { state: { item } }); // Use _id for MongoDB
    } else if (item.type === "category") {
      navigate(`/details/${item._id}`, { state: { item } }); // Use _id for MongoDB
    }

    // Clear search bar & suggestions
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-md">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 w-full text-gray-700 focus:outline-none"
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-200 w-full mt-1 rounded shadow-lg z-10">
          {suggestions.map((item) => (
            <li
              key={item._id}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer text-black space-x-2"
              onClick={() => handleItemClick(item)}
            >
              {item?.imageBase64 && (
                <img
                  src={item.imageBase64}
                  alt={item.name}
                  className="w-10 h-10 object-cover rounded-md"
                />
              )}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
