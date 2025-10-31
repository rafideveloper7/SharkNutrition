import React from 'react';
import protein1 from '../../assets/protein1.png'
import protein2 from '../../assets/protein2.png'
import protein3 from '../../assets/protein3.png'


export default function AllProducts() {
  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 lg:mb-6 gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">All Products</h1>
        <button className="bg-green-400 text-blue-600 px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm lg:text-base w-full sm:w-auto">
          Add New Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-gray-800 rounded-lg p-4 text-white shadow-lg">
          <img 
            src={protein1} 
            alt="Product" 
            className="mx-auto h-40 lg:h-48 object-cover rounded-md mb-3 lg:mb-4"
          />
          <h3 className="text-lg lg:text-xl font-bold mb-2">Nitrotech Whey Protein</h3>
          <p className="text-gray-300 text-sm lg:text-base mb-2">Category: Protein</p>
          <p className="text-green-400 font-bold text-base lg:text-lg mb-3">Rs 2,600</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="bg-blue-400 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm lg:text-base flex-1">
              Edit
            </button>
            <button className="bg-red-400 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors text-sm lg:text-base flex-1">
              Delete
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 text-white shadow-lg">
          <img 
            src={protein2}
            alt="Product" 
            className="mx-auto h-40 lg:h-48 object-cover rounded-md mb-3 lg:mb-4"
          />
          <h3 className="text-lg lg:text-xl font-bold mb-2">Creatine Monohydrate</h3>
          <p className="text-gray-300 text-sm lg:text-base mb-2">Category: Creatine</p>
          <p className="text-green-400 font-bold text-base lg:text-lg mb-3">Rs 1,200</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="bg-blue-400 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm lg:text-base flex-1">
              Edit
            </button>
            <button className="bg-red-400 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors text-sm lg:text-base flex-1">
              Delete
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 text-white shadow-lg">
          <img 
            src={protein3}
            alt="Product" 
            className="mx-auto h-40 lg:h-48 object-cover rounded-md mb-3 lg:mb-4"
          />
          <h3 className="text-lg lg:text-xl font-bold mb-2">C4 Pre Workout</h3>
          <p className="text-gray-300 text-sm lg:text-base mb-2">Category: Pre Workout</p>
          <p className="text-green-400 font-bold text-base lg:text-lg mb-3">Rs 1,800</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="bg-blue-400 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm lg:text-base flex-1">
              Edit
            </button>
            <button className="bg-red-400 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors text-sm lg:text-base flex-1">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}