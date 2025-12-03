import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { toast } from "react-hot-toast";

import getImageUrl from "../../utils/imageHelper";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    _id: "",
    name: "",
    price: "",
    category: "",
    flavor: [""],
    servings: [""],
    weight: "",
    description: "",
    gallery: [], // new images
    existingGallery: [], // existing images from DB
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/products/getAllProducts`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setProducts(data.products);
      else toast.error("Failed to fetch products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openEditModal = (product) => {
    setCurrentProduct({
      _id: product._id,
      name: product.name,
      price: product.price,
      category: product.category,
      flavor: product.flavor?.length ? product.flavor : [""],
      servings: product.servings?.length ? product.servings : [""],
      weight: product.weight || "",
      description: product.description || "",
      gallery: [],
      existingGallery: product.gallery || [],
    });
    setIsModalOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", currentProduct.name);
      formData.append("price", Number(currentProduct.price));
      formData.append("category", currentProduct.category);
      formData.append("weight", currentProduct.weight);
      formData.append("description", currentProduct.description);
      formData.append("flavor", JSON.stringify(currentProduct.flavor));
      formData.append("servings", JSON.stringify(currentProduct.servings));

      // Append each existing image URL separately. This is easier for backend to parse.
      currentProduct.existingGallery.forEach(url => formData.append("existingGallery[]", url));

      currentProduct.gallery.forEach((file) => formData.append("images", file));

      const res = await fetch(`${API_BASE}/products/${currentProduct._id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Product updated successfully!");
        fetchProducts();
        setIsModalOpen(false);
      } else {
        toast.error(data.message || "Failed to update product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    }
  };

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="text-black">Are you sure you want to delete this product?</p>
          <div className="flex gap-2">
            <Button
              className="bg-red-500 hover:bg-red-600 text-white w-full"
              onClick={() => {
                toast.dismiss(t.id);
                confirmDelete(id);
              }}
            >
              Delete
            </Button>
            <Button className="bg-gray-500 hover:bg-gray-600 text-white w-full" onClick={() => toast.dismiss(t.id)}>
              Cancel
            </Button>
          </div>
        </div>
      ),
      { duration: 6000 }
    );
  };

  const confirmDelete = async (id) => {
    const deletePromise = fetch(`${API_BASE}/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to delete");
      fetchProducts();
    });
    toast.promise(deletePromise, {
      loading: "Deleting product...",
      success: "Product deleted successfully!",
      error: (err) => err.toString(),
    });
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="text-blue p-4 fles justify-center items-center">Loading...</div>;

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
                src={getImageUrl(product.gallery?.[0] || product.image)}
                alt={product.name}
                className="mx-auto h-40 lg:h-48 object-cover rounded-md mb-3 lg:mb-4"
              />
              <h3 className="text-lg lg:text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-300 text-sm lg:text-base mb-2">Category: {product.category}</p>
              <p>
                <del className="text-gray-400 text-base lg:text-lg mb-2 me-2">Rs 20000</del>
                <ins className="text-blue-400 font-bold text-base lg:text-lg mb-2 no-underline">Rs 19000</ins>
              </p>
              <p className="text-gray-300 text-base lg:text-lg mb-2">Quantity: <span className="text-blue-300">21</span></p>
              <p className="text-gray-300 text-sm lg:text-base mb-2">Servings: {product.servings?.join(", ")}</p>
              <p className="text-gray-300 text-sm lg:text-base mb-3">Flavor: {product.flavor?.join(", ")}</p>

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
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
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
              type="number"
              value={currentProduct.oldPrice}
              onChange={(e) => setCurrentProduct({ ...currentProduct, oldPrice: e.target.value })}
              placeholder="Old price"
            />
            <Input
              type="number"
              value={currentProduct.newPrice}
              onChange={(e) => setCurrentProduct({ ...currentProduct, newPrice: e.target.value })}
              placeholder="New Price"
            />
            <Input
              type="number"
              value={currentProduct.quantity}
              onChange={(e) => setCurrentProduct({ ...currentProduct, quantity: e.target.value })}
              placeholder="Quantity"
            />
            <Input
              value={currentProduct.category}
              onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
              placeholder="Category"
            />
            <Input
              value={currentProduct.weight}
              onChange={(e) => setCurrentProduct({ ...currentProduct, weight: e.target.value })}
              placeholder="Weight"
            />
            <Input
              value={currentProduct.description}
              onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
              placeholder="Description"
            />

            {/* Dynamic Flavors */}
            <div>
              <label className="block text-gray-300 mb-1 text-sm">Flavor</label>
              {currentProduct.flavor?.map((f, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <Input
                    value={f}
                    onChange={(e) => {
                      const newFlavors = [...currentProduct.flavor];
                      newFlavors[idx] = e.target.value;
                      setCurrentProduct({ ...currentProduct, flavor: newFlavors });
                    }}
                    placeholder="Flavor"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setCurrentProduct({ ...currentProduct, flavor: [...(currentProduct.flavor || []), ""] })
                }
              >
                + Add Flavor
              </Button>
            </div>

            {/* Dynamic Servings */}
            <div>
              <label className="block text-gray-300 mb-1 text-sm">Servings</label>
              {currentProduct.servings?.map((s, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <Input
                    value={s}
                    onChange={(e) => {
                      const newServings = [...currentProduct.servings];
                      newServings[idx] = e.target.value;
                      setCurrentProduct({ ...currentProduct, servings: newServings });
                    }}
                    placeholder="Servings"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setCurrentProduct({ ...currentProduct, servings: [...(currentProduct.servings || []), ""] })
                }
              >
                + Add Serving
              </Button>
            </div>

            {/* Existing Images */}
            <div>
              <label className="block text-gray-300 mb-1 text-sm">Existing Images</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {currentProduct.existingGallery?.map((url, idx) => (
                  <div key={idx} className="relative w-20 h-20">
                    <img src={getImageUrl(url)} alt="existing" className="w-full h-full object-cover rounded-md" />
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentProduct({
                          ...currentProduct,
                          existingGallery: currentProduct.existingGallery.filter((_, i) => i !== idx),
                        })
                      }
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* New Gallery Images */}
            <div>
              <label className="block text-gray-300 mb-1 text-sm">Add New Images</label>

              {/* Hidden file input */}
              <input
                type="file"
                name="gallery"
                multiple
                accept="image/*"
                id="galleryInput"
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, gallery: [...currentProduct.gallery, ...e.target.files] })
                }
                className="hidden"
              />

              {/* Custom button */}
              <label
                htmlFor="galleryInput"
                className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-sm lg:text-base"
              >
                + Select Images
              </label>

              <div className="flex flex-wrap gap-2 mt-2">
                {currentProduct.gallery?.map((file, idx) => (
                  <div key={idx} className="relative w-20 h-20">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentProduct({
                          ...currentProduct,
                          gallery: currentProduct.gallery.filter((_, i) => i !== idx),
                        });
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
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
