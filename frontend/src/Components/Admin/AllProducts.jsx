import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    _id: "",
    name: "",
    price: "",
    category: "",
    image: "",
    imageFile: null,
  });

  const API_BASE = "http://localhost:5000/products";

  // Helper function to get correct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/images/placeholder.png";
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads')) return `http://localhost:5000${imagePath}`;
    return `http://localhost:5000/uploads/${imagePath}`;
  };

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/getAllProducts`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open modal with product details for editing
  const openEditModal = (product) => {
    setCurrentProduct({
      _id: product._id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image || "",
      imageFile: null,
    });
    setIsModalOpen(true);
  };

  // Save edited product
  const handleEditSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", currentProduct.name);
      formData.append("price", Number(currentProduct.price));
      formData.append("category", currentProduct.category);

      if (currentProduct.imageFile) {
        formData.append("image", currentProduct.imageFile);
      }

      const res = await fetch(`${API_BASE}/${currentProduct._id}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Product updated successfully!");
        fetchProducts();
        setIsModalOpen(false);
      } else {
        toast.error("Failed to update product: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Product deleted successfully!");
        fetchProducts();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  // Filter products by search query
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="p-4 lg:p-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 lg:mb-6 gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">All Products</h1>
        <div className="bg-gray-800 rounded-[15px] px-10 relative w-full sm:w-64">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300" />
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-4 py-2 rounded-lg w-full text-white focus:outline-none "
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="bg-gray-800 rounded-lg p-4 text-white shadow-lg">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="mx-auto h-40 lg:h-48 object-cover rounded-md mb-3 lg:mb-4"
              />
              <h3 className="text-lg lg:text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-300 text-sm lg:text-base mb-2">Category: {product.category}</p>
              <p className="text-blue-400 font-bold text-base lg:text-lg mb-3">Rs {product.price}</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={() => openEditModal(product)}
                  className="bg-blue-400 hover:bg-blue-700 text-white flex-1"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-400 hover:bg-red-700 text-white flex-1"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-white col-span-full">No matching products found.</div>
        )}
      </div>

      {/* Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product details below</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <Input
              value={currentProduct.name}
              onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
              placeholder="Name"
            />
            <Input
              value={currentProduct.price}
              type="number"
              onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
              placeholder="Price"
            />
            <Input
              value={currentProduct.category}
              onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
              placeholder="Category"
            />

            {/* File input */}
            <div>
              <label className="block text-gray-300 mb-1 text-sm">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCurrentProduct({ ...currentProduct, imageFile: e.target.files[0] })}
                className="w-full text-black"
              />

              {/* Image Preview */}
              {currentProduct.imageFile ? (
                <img
                  src={URL.createObjectURL(currentProduct.imageFile)}
                  alt="Preview"
                  className="mt-2"
                  style={{ width: "150px", height: "150px", objectFit: "contain", borderRadius: "8px" }}
                />
              ) : currentProduct.image ? (
                <img
                  src={getImageUrl(currentProduct.image)}
                  alt="Current"
                  className="mt-2"
                  style={{ width: "150px", height: "150px", objectFit: "contain", borderRadius: "8px" }}
                />
              ) : null}
            </div>
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}