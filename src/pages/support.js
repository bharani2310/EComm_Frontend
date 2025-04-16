import axios from "axios"
import toast from "react-hot-toast"
import { BASE_URL } from "../utils/config"



export const sendOtp = async(data) => {
    const Url=`${BASE_URL}/sendOtp`
    try {
      const response=await axios.post(Url,{ email: data.email })
      console.log(response)
      if(response?.data?.success){
        toast.success(response?.data?.message)
        return true;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
      return false;
    }
}

export const verifyOtp = async(data,otp) => {
  const Url=`${BASE_URL}/verifyOtp`
  const num = Number(otp.join(''));
  try {
    const response=await axios.post(Url,{ email: data.email , otp: num})
    console.log(response)
    if(response?.data?.success){
      return response;
    }
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return error;
  }
}


export const registerUser = async(data) => {
  const Url=`${BASE_URL}/register`
  try {
    const response=await axios.post(Url,{data})
    toast.success(response?.data?.message)

  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.message)
  }
}

export const loginUser = async(data) => {
  const Url=`${BASE_URL}/login`
  try {
    const response=await axios.post(Url,{data})
    toast.success(response?.data?.message)
    return response

  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.message)
  }
}


export const updateUserDetails = async (id, userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    console.log(response)

    if (!response.ok) {
      throw new Error("Failed to update user details");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};


export const fetchCategoriesWithProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products-by-category`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};




