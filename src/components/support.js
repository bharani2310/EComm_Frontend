import toast from "react-hot-toast";
import { BASE_URL } from "../utils/config";
import axios from "axios";

const API_URL = `${BASE_URL}/categories`;
const CART_URL = `${BASE_URL}/cart`;
const PRODUCT_URL = `${BASE_URL}/products`;
const USER_URL = `${BASE_URL}/user`;

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { data: [] }; // Return an empty array if fetch fails
  }
};

// Add a new category
export const addCategory = async (category) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: category }),
    });

    if (!response.ok) throw new Error("Failed to add category");
    return await response.json();
  } catch (error) {
    console.error("Error adding category:", error);
    return null;
  }
};

// Update a category
export const updateCategory = async (id, newName) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });

    if (!response.ok) throw new Error("Failed to update category");
    return await response.json();
  } catch (error) {
    console.error("Error updating category:", error);
    return null;
  }
};

// Delete a category
export const deleteCategory = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok){
      toast.error("Failed to delete category.Deleting it may leave a orphaned items.");
      return 0;
    } 
    else{
      toast.success("Deleted Successfully")
      return 1;
    }
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};

// Fetch all products
export const getProducts = async () => {
  try {
    const response = await fetch(PRODUCT_URL);
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Add a new product
export const addProduct = async (productData) => {
  try {
    const response = await fetch(PRODUCT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (!response.ok) throw new Error("Failed to add product");
    return await response.json();
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
};

// Update a product
export const updateProduct = async (id, updatedData) => {
  try {
    const response = await fetch(`${PRODUCT_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) throw new Error("Failed to update product");
    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${PRODUCT_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete product");
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};


//Get user Count
export const getUserCount = async () => {
  try {
    const response = await fetch(USER_URL);
    if (!response.ok) throw new Error("Failed to fetch User");

    const data = await response.json();
    return data; // Ensure it returns { count: number }
  } catch (error) {
    console.error("Error fetching User:", error);
    return { count: 0 }; // Return a valid object to prevent crashes
  }
};


//search a new product
export const fetchItems = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(`${BASE_URL}/search?q=${query}`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};

//Add cart Items
export const addToCart = async (userId, product) => {
  try {
    const response = await axios.post(`${CART_URL}/`, {
      userId,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      imageBase64: product.imageBase64,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};


// Fetch cart items from backend
export const fetchCartItems = async (userId) => {
  try {
    const response = await axios.get(`${CART_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return [];
  }
};

// Update cart item quantity
export const updateCartItem = async (userId, productId, quantity) => {
  try {
    const response = await axios.put(`${CART_URL}/${userId}/${productId}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cart item:", error);
  }
};

// Remove item from cart
export const removeCartItem = async (userId, productId) => {
  try {
    await axios.delete(`${CART_URL}/${userId}/${productId}`);
  } catch (error) {
    console.error("Error removing cart item:", error);
  }
};