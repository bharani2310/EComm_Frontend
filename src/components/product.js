import React, { useState, useEffect } from "react";
import {
  getProducts,
  fetchCategories as fetchCategoriesFromAPI,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./support";
import toast from "react-hot-toast";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [unit, setUnit] = useState("kg");
  const [actualWeight, setActualWeight] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 5;

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };




  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await fetchCategoriesFromAPI();
      setCategories(data?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
    }
  };

  const handleEditProduct = () => {
    if (!selectedProduct) return toast.error("Select a product to edit");

    const productToEdit = products.find((p) => p.id === selectedProduct);
    if (!productToEdit) return;

    setName(productToEdit.name);
    setPrice(productToEdit.price);
    setStock(productToEdit.stock);
    setCategoryId(productToEdit.categoryId);
    setImageBase64(productToEdit.imageBase64);
    setUnit(productToEdit.unit);
    setActualWeight(productToEdit.actualWeight);
    setIsEditing(true);
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return toast.error("Select a product to delete");

    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(selectedProduct);
      toast.success("Deleted Successfully");
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !stock || !categoryId) {
      return toast.error("Please fill in all required fields");
    }

    const productData = {
      name,
      price,
      stock,
      categoryId,
      unit,
      actualWeight,
      imageBase64,
    };

    try {
      if (isEditing) {
        await updateProduct(selectedProduct, productData);
        toast.success("Product updated successfully");
      } else {
        await addProduct(productData);
        toast.success("Product added successfully");
      }

      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setStock("");
    setCategoryId("");
    setImageBase64("");
    setUnit("kg");
    setActualWeight("");
    setSelectedProduct(null);
    setIsEditing(false);
    document.getElementById("fileInput").value = "";
  };

  const startIndex = currentPage * productsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-lg font-bold mb-4 text-center">
        {isEditing ? "Edit Product" : "Manage Products"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="border px-3 py-2 w-full rounded"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="border px-3 py-2 w-full rounded"
        />
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock"
          className="border px-3 py-2 w-full rounded"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border px-3 py-2 w-full rounded"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <div className="flex space-x-2">
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="border px-3 py-2 w-1/2 rounded"
          >
            <option value="kg">Kilogram (kg)</option>
            <option value="litre">Litre (L)</option>
          </select>
          <input
            type="number"
            value={actualWeight}
            onChange={(e) => setActualWeight(e.target.value)}
            placeholder="Enter weight/volume"
            className="border px-3 py-2 w-1/2 rounded"
          />
        </div>

        <input
          type="file"
          id="fileInput"
          onChange={handleImageChange}
          className="border px-3 py-2 w-full rounded"
        />
        {imageBase64 && (
          <img src={imageBase64} alt="Product" className="w-12 h-12 mt-2" />
        )}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded">
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>

      <table className="w-full mt-4 border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th>Select</th><th>Name</th><th>Price</th><th>Stock</th><th>Category</th><th>Unit</th><th>Weight</th><th>Image</th>
          </tr>
        </thead>
        <tbody>
          {displayedProducts.map((product) => (
            <tr key={product.id} className="border">
              <td>
                <input type="radio" name="selectedProduct" checked={selectedProduct === product.id} onChange={() => setSelectedProduct(product.id)} />
              </td>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>{product.stock}</td>
              <td>{categories.find((c) => c.id === product.categoryId)?.name || "Unknown"}</td>
              <td>{product.unit}</td>
              <td>{product.actualWeight}</td>
              <td>{product.imageBase64 && <img src={product.imageBase64} alt="Product" className="w-12 h-12 mx-auto" />}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button onClick={handleEditProduct} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
        <button onClick={handleDeleteProduct} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </div>

      <div className="flex justify-between mt-4">
          <button 
            onClick={handlePrevPage} 
            disabled={currentPage === 0} 
            className={`px-4 py-2 rounded ${currentPage === 0 ? "bg-gray-300" : "bg-gray-500 text-white"}`}
          >
            Prev
          </button>
          
          <span className="px-4 py-2">Page {currentPage + 1} of {totalPages}</span>
          
          <button 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages - 1} 
            className={`px-4 py-2 rounded ${currentPage === totalPages - 1 ? "bg-gray-300" : "bg-gray-500 text-white"}`}
          >
            Next
          </button>
        </div>

    </div>

    
  );
};

export default Product;
