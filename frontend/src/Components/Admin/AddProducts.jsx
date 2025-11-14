import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AddProducts() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    weight: "",
    flavor: [""],
    servings: [""],
    image: null,
  });

  const handleChange = (e, idx, type) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else if (type === "flavor") {
      const newFlavors = [...formData.flavor];
      newFlavors[idx] = e.target.value;
      setFormData({ ...formData, flavor: newFlavors });
    } else if (type === "servings") {
      const newServings = [...formData.servings];
      newServings[idx] = e.target.value;
      setFormData({ ...formData, servings: newServings });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (Array.isArray(formData[key])) {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE}/products`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      toast.success("Product added successfully!");
      setFormData({
        name: "",
        category: "",
        price: "",
        weight: "",
        flavor: [""],
        servings: [""],
        image: null,
      });
    } catch (err) {
      console.error(err);
      toast.error("Error adding product.");
    }
  };

  return (
    <div className="p-4 lg:p-6 pb-20">
      <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6">
        Add New Product
      </h1>
      <div className="bg-gray-800 rounded-lg p-4 lg:p-6 text-white shadow-lg max-w-2xl mx-auto">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Product Name */}
          <div>
            <label className="block text-sm lg:text-base font-medium mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 lg:px-4 py-2 text-sm lg:text-base bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter product name"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm lg:text-base font-medium mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 lg:px-4 py-2 text-sm lg:text-base bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Category</option>
              <option value="protein">Protein</option>
              <option value="creatine">Creatine</option>
              <option value="preworkout">Pre Workout</option>
              <option value="weightgainer">Weight Gainer</option>
              <option value="vitamins and minerals">Vitamin and Minerals</option>
              <option value="amino acid">Amino Acid</option>
            </select>
          </div>

          {/* Price & Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm lg:text-base font-medium mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 lg:px-4 py-2 text-sm lg:text-base bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter price"
              />
            </div>
            <div>
              <label className="block text-sm lg:text-base font-medium mb-2">Weight</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-3 lg:px-4 py-2 text-sm lg:text-base bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="e.g., 2kg, 500g"
              />
            </div>
          </div>

          {/* Dynamic Flavor Fields */}
          <div>
            <label className="block text-sm lg:text-base font-medium mb-2">Flavor</label>
            {formData.flavor.map((f, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={f}
                  onChange={(e) => handleChange(e, idx, "flavor")}
                  className="w-full px-3 lg:px-4 py-2 text-sm lg:text-base bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter flavor"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setFormData({ ...formData, flavor: [...formData.flavor, ""] })}
              className="px-3 py-1 border border-blue-500 text-gray-300 rounded-lg hover:bg-blue-500 hover:text-white transition"
            >
              + Add Flavor
            </button>
          </div>

          {/* Dynamic Servings Fields */}
          <div>
            <label className="block text-sm lg:text-base font-medium mb-2">Servings</label>
            {formData.servings.map((s, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={s}
                  onChange={(e) => handleChange(e, idx, "servings")}
                  className="w-full px-3 lg:px-4 py-2 text-sm lg:text-base bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter servings"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setFormData({ ...formData, servings: [...formData.servings, ""] })}
              className="px-3 py-1 border border-blue-500 text-gray-300 rounded-lg hover:bg-blue-500 hover:text-white transition"
            >
              + Add Servings
            </button>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm lg:text-base font-medium mb-2">Product Image</label>
            <input
              type="file"
              name="image"
              onChange={(e) => handleChange(e)}
              className="w-full px-3 lg:px-4 py-2 text-sm cursor-pointer lg:text-base bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors text-sm lg:text-base"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
