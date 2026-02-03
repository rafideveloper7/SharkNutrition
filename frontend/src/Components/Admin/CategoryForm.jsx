import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const initialState = {
  name: "",
  image: "",
  isFeatured: false,
  sliderOrder: ""
};

const CategoryForm = ({ editData, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState(initialState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     EDIT MODE FILL
  ========================= */
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        image: editData.image,
        isFeatured: editData.isFeatured,
        sliderOrder: editData.sliderOrder || ""
      });
      setPreview(editData.image || "");
      setSelectedFile(null);
    } else {
      setFormData(initialState);
      setPreview("");
      setSelectedFile(null);
    }
  }, [editData]);

  /* =========================
     HANDLE CHANGE
  ========================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editData
        ? `${import.meta.env.VITE_API_BASE}/api/categories/${editData._id}`
        : `${import.meta.env.VITE_API_BASE}/api/categories`;

      const method = editData ? "PUT" : "POST";

      // Use FormData for file upload
      const data = new FormData();
      data.append("name", formData.name);
      data.append("isFeatured", formData.isFeatured);
      if (formData.sliderOrder) data.append("sliderOrder", formData.sliderOrder);
      
      if (selectedFile) {
        data.append("image", selectedFile);
      } else if (formData.image) {
        data.append("image", formData.image); // Keep existing URL if no new file
      }

      const res = await fetch(url, {
        method,
        body: data,
        credentials: "include",
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to save category");

      setFormData(initialState);
      setPreview("");
      setSelectedFile(null);
      toast.success(editData ? "Category updated successfully" : "Category created successfully");
      onSuccess && onSuccess();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
      <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
        {editData ? "Edit Category" : "Add New Category"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Category Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Protein"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Category Image</label>
            
            {preview && (
              <div className="mb-3">
                <img 
                  src={preview}
                  alt="Preview" 
                  className="h-24 w-24 object-cover rounded-lg border border-gray-600" 
                />
              </div>
            )}

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3 bg-gray-700/50 px-4 py-3 rounded-lg border border-gray-700 w-full sm:w-auto">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800 cursor-pointer"
            />
            <label htmlFor="isFeatured" className="text-gray-300 text-sm font-medium cursor-pointer select-none">
              Show in homepage slider
            </label>
          </div>

          {formData.isFeatured && (
            <div className="w-full sm:w-auto flex-1 animate-in fade-in slide-in-from-left-2 duration-300">
              <input
                type="number"
                name="sliderOrder"
                placeholder="Slider Order (e.g. 1)"
                value={formData.sliderOrder}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>
          )}
        </div>

        <div className="pt-2 flex gap-3">
          <button
            disabled={loading}
            className={`w-full sm:w-auto px-8 py-2.5 rounded-lg font-semibold text-white transition duration-200 shadow-md flex items-center justify-center gap-2 ${
              loading
                ? "bg-gray-600 cursor-not-allowed opacity-70"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95"
            }`}
          >
            {loading && (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {loading ? "Saving..." : editData ? "Update Category" : "Create Category"}
          </button>

          {editData && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-semibold text-white bg-gray-600 hover:bg-gray-700 transition duration-200 shadow-md"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
