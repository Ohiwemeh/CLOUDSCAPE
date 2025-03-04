// import React from 'react'
import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios"


const useProductStore = create((set) => (
    {
        products: [],
        loading: false,

        setProducts: (products) => set({ products }),

        createProduct: async (productData) => {
            set({ loading: true });
            try {
                const res = await axios.post("/products", productData);
                set((prevState) => ({
                    products: [...prevState.products, res.data],
                    loading: false,
                }));
            } catch (error) {
                toast.error(error.response.data.error);
                set({ loading: false });
            }
        },

        fetchAllProducts: async () => {
            set({ loading: true });
            try {
                const response = await axios.get("/products");
                set({ products: response.data.products, loading: false });
            } catch (error) {
                set({ error: "Failed to fetch products", loading: false });
                toast.error(error.response.data.error || "Failed to fetch products");
            }
        },

        fetchProductsByCategory: async (category) => {
            set({ loading: true });
            try {
                const response = await axios.get(`/products/category/${category}`);
                set({ products: response.data.products, loading: false });
            } catch (error) {
                set({ error: "Failed to fetch products", loading: false });
                toast.error(error.response.data.error || "Failed to fetch products");
            }
        },

        deleteProduct: async (id) => {
            set({ loading: true });
            try {
                await axios.delete(`/products/${id}`); // ✅ Use `id` here
                set((prevState) => ({
                    products: prevState.products.filter((product) => product._id !== id), // ✅ Use `id` here
                    loading: false,
                }));
            } catch (error) {
                set({ loading: false });
                toast.error(error.response?.data?.error || "Failed to delete product");
            }
        },
        
        toggleFeaturedProduct: async (productId) => {
            set({ loading: true });
            try {
                const response = await axios.patch(`/products/${productId}`);
                //this will change the isFeatured prop of the products in the store
                set((prevState) => ({
                    products: prevState.products.map((product) =>  // ✅ Corrected key
                        product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
                    ),
                    loading: false,
                }));
                
            } catch (error) {
                set({ loading: false });
                toast.error(error.response.data.error || "Failed to update products");

            }
        },


    }))
//       return (
//           <div>

//     </div>
//   )


export default useProductStore;
