import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function AddProducts() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    oldPrice: "",
    newPrice: "",
    quantity: "",
    weight: "",
    flavor: [""],
    servings: [""],
    description: "",
    gallery: [],
  });

  // Handle input changes
  const handleChange = (e, idx, type) => {
    if (e.target.name === "gallery") {
      setFormData({ ...formData, gallery: [...formData.gallery, ...e.target.files] });
    } else if (type === "flavor") {
      const newFlavors = [...formData.flavor];
      newFlavors[idx] = e.target.value;
      setFormData({ ...formData, flavor: newFlavors });
    } else if (type === "servings") {
      const newServings = [...formData.servings];
      newServings[idx] = e.target.value;
      setFormData({ ...formData, servings: newServings });
      return
    }

    const name = e.target.name;
    let value = e.target.value;

    if (["oldPrice", "newPrice", "quantity"].includes(name)) {
      value = value === "" ? "" : Number(value);
    }

    setFormData({ ...formData, [name]: value });
  };

  // Remove image from gallery
  const removeImage = (index) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter((_, i) => i !== index),
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category) {
      toast.error("Please enter product name and category");
      return;
    }
    if (!formData.newPrice || Number(formData.newPrice) <= 0) {
      toast.error("Please enter a valid new price");
      return;
    }
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    const data = new FormData();

    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("weight", formData.weight);
    data.append("description", formData.description);

    data.append("oldPrice", formData.oldPrice !== "" ? String(formData.oldPrice) : "");
    data.append("newPrice", formData.newPrice !== "" ? String(formData.newPrice) : "");
    data.append("quantity", formData.quantity !== "" ? String(formData.quantity) : "");

    data.append("flavor", JSON.stringify(formData.flavor));
    data.append("servings", JSON.stringify(formData.servings));

    formData.gallery.forEach((file) => data.append("images", file));

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/products`, {
        method: "POST",
        body: data,
        credentials: "include",
      }); const result = await res.json();
      if (result.success) {
        toast.success("Product added successfully!");
        setFormData({
          name: "",
          category: "",
          oldPrice: "",
          newPrice: "",
          quantity: "",
          weight: "",
          flavor: [""],
          servings: [""],
          description: "",
          gallery: [],
        });
      } else {
        toast.error(result.error || "Failed to add product");
      }
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
            <label className="block mb-2 font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Category</option>
              <option value="protein">Protein</option>
              <option value="creatine">Creatine</option>
              <option value="preworkout">Pre Workout</option>
              <option value="weightgainer">Weight Gainer</option>
              <option value="vitamins and minerals">Vitamin & Minerals</option>
              <option value="amino acid">Amino Acid</option>
            </select>
          </div>

          {/* Price & Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Old Price</label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                placeholder="Enter old price"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">New Price</label>
              <input
                type="number"
                name="newPrice"
                value={formData.newPrice}
                onChange={handleChange}
                placeholder="Enter new price"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Weight</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="e.g., 2kg, 500g"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={4}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Dynamic Flavors */}
            <div>
              <label className="block mb-2 font-medium">Flavors</label>
              {formData.flavor.map((f, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={f}
                    onChange={(e) => handleChange(e, idx, "flavor")}
                    placeholder="Enter flavor"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, flavor: [...formData.flavor, ""] })}
                className="px-3 py-1 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
              >
                + Add Flavor
              </button>
            </div>

            {/* Dynamic Servings */}
            <div>
              <label className="block mb-2 font-medium">Servings</label>
              {formData.servings.map((s, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="number"
                    value={s}
                    onChange={(e) => handleChange(e, idx, "servings")}
                    placeholder="Enter servings"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, servings: [...formData.servings, ""] })}
                className="px-3 py-1 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
              >
                + Add Serving
              </button>
            </div>

          </div>




          {/* Gallery Images */}
          <div>
            <label className="block mb-2 font-medium">Product Images</label>
            <input
              type="file"
              name="gallery"
              multiple
              onChange={(e) => handleChange(e)}
              className="w-full px-3 py-2 cursor-pointer bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            />
            {/* Preview Selected Images */}
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.gallery.map((file, idx) => (
                <div key={idx} className="relative w-20 h-20">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
