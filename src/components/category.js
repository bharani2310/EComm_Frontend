import React, { useState, useEffect } from "react";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "./support.js";
import toast from "react-hot-toast";

const Category = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const categoriesPerPage = 10;

  // Fetch categories from the database
  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data.data);
    };
    getCategories();
  }, []);

  // Handle adding a category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (category.trim() === "") return;
  
    try {
      const response = await addCategory(category); // API call
      if (response.success) {
        setCategories([...categories, response.data]); // Append new category
        toast.success(response?.message)
        setCategory(""); // Clear input field
      } else {
        console.error("Failed to add category:", response.message);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Error adding category")
    }
  };
  

  // Handle editing a category
  const handleEditCategory = async () => {
    if (selectedCategory !== null) {
      const categoryToEdit = categories.find((_, index) => index === selectedCategory); // Get category object
      if (!categoryToEdit) return;
  
      const newCategory = prompt("Edit category:", categoryToEdit.name);
      if (newCategory) {
        const response=await updateCategory(categoryToEdit.id, newCategory); // Use correct ID
        const updatedCategories = categories.map((cat, index) =>
          index === selectedCategory ? { ...cat, name: newCategory } : cat
        );
        setCategories(updatedCategories);
        toast.success(response?.message)
        setSelectedCategory(null);
      }
    }
  };
  

  // Handle deleting a category
  const handleDeleteCategory = async () => {
    if (selectedCategory !== null) {
      const categoryToDelete = categories[selectedCategory]; // Get the selected category object
      if (!categoryToDelete) return;
  
      // Ask for confirmation
      const isConfirmed = window.confirm(`Are you sure you want to delete "${categoryToDelete.name}"?`);
      if (!isConfirmed) return; // If user cancels, do nothing
  
      const response=await deleteCategory(categoryToDelete.id); 
      if(response===1){
        setCategories(categories.filter((_, i) => i !== selectedCategory)); // Remove from state
        setSelectedCategory(null);
      }
    }
  };
  
  

  const startIndex = currentPage * categoriesPerPage;
  const displayedCategories = categories.slice(startIndex, startIndex + categoriesPerPage);

  return (
    <div className="mb-4 p-4 w-full max-w-lg mx-auto">
      <h2 className="text-lg font-bold mb-2 text-center">Manage Categories</h2>
      <form onSubmit={handleAddCategory} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category name"
          className="border px-3 py-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto">
          Add
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Select</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {displayedCategories.map((cat, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === startIndex + index}
                    onChange={() => setSelectedCategory(startIndex + index)}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">{cat.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4 text-center">
        <button
          onClick={handleEditCategory}
          disabled={selectedCategory === null}
          className="bg-yellow-500 text-white px-4 py-2 rounded disabled:opacity-50 w-full sm:w-auto mb-2 sm:mb-0"
        >
          Edit
        </button>
        <button
          onClick={handleDeleteCategory}
          disabled={selectedCategory === null}
          className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50 w-full sm:w-auto"
        >
          Delete
        </button>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50 w-full sm:w-auto"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => (startIndex + categoriesPerPage < categories.length ? prev + 1 : prev))}
          disabled={startIndex + categoriesPerPage >= categories.length}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50 w-full sm:w-auto"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Category;
