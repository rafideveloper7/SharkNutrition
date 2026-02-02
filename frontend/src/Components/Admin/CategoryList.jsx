import { useEffect, useState, useRef } from "react";
import CategoryForm from "./CategoryForm";
import { toast } from "react-hot-toast";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const formRef = useRef(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/categories`, {
        credentials: "include",
      });
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Category deleted");
        fetchCategories();
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      toast.error("Error deleting category");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div ref={formRef}>
        <CategoryForm
          editData={editCategory}
          onSuccess={() => {
            setEditCategory(null);
            fetchCategories();
          }}
          onCancel={() => setEditCategory(null)}
        />
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700 bg-gray-800/50">
          <h3 className="text-lg font-bold text-white">All Categories</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700/50 text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-3 font-medium">Image</th>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Featured</th>
                <th className="px-6 py-3 font-medium">Order</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-gray-700/30 transition duration-150">
                    <td className="px-6 py-4">
                      {cat.image ? (
                        <img 
                          src={cat.image} 
                          alt={cat.name} 
                          className="h-10 w-10 object-cover rounded-full border border-gray-600"
                        />
                      ) : <div className="h-10 w-10 bg-gray-700 rounded-full"></div>}
                    </td>
                    <td className="px-6 py-4 text-white font-medium">{cat.name}</td>
                    <td className="px-6 py-4">
                      {cat.isFeatured ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-400 border border-green-800">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-400 border border-gray-600">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-300">{cat.sliderOrder ?? "-"}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => {
                          setEditCategory(cat);
                          formRef.current?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-3 py-1.5 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-md text-sm font-medium transition"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(cat._id)}
                        className="px-3 py-1.5 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded-md text-sm font-medium transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
