import React from 'react';

export default function AddProducts() {
  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6">Add New Product</h1>

      <div className="bg-gray-800 rounded-lg p-4 lg:p-6 text-white shadow-lg max-w-2xl mx-auto">
        <form className="space-y-4">
          <div>
            <label className="block text-sm lg:text-base font-medium mb-2">Product Name</label>
            <input 
              type="text" 
              className="w-full px-3 lg:px-4 py-2 text-sm lg:text-base bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm lg:text-base font-medium mb-2">Category</label>
            <select className="w-full px-3 lg:px-4 py-2 text-sm lg:text-base bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500">
              <option value="">Select Category</option>
              <option value="protein">Protein</option>
              <option value="creatine">Creatine</option>
              <option value="preworkout">Pre Workout</option>
              <option value="weightgainer">Weight Gainer</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm lg:text-base font-medium mb-2">Price</label>
              <input 
                type="number" 
                className="w-full px-3 lg:px-4 py-2 text-sm lg:text-base bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter price"
              />
            </div>
            <div>
              <label className="block text-sm lg:text-base font-medium mb-2">Weight</label>
              <input 
                type="text" 
                className="w-full px-3 lg:px-4 py-2 text-sm lg:text-base bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="e.g., 2kg, 500g"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm lg:text-base font-medium mb-2">Flavor</label>
            <input 
              type="text" 
              className="w-full px-3 lg:px-4 py-2 text-sm lg:text-base bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter flavor"
            />
          </div>

          <div>
            <label className="block text-sm lg:text-base font-medium mb-2">Product Image</label>
            <input 
              type="file" 
              className="w-full px-3 lg:px-4 py-2 text-sm lg:text-base bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm lg:text-base font-medium mb-2">Description</label>
            <textarea 
              rows="4"
              className="w-full px-3 lg:px-4 py-2 text-sm lg:text-base bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter product description"
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition-colors text-sm lg:text-base"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}