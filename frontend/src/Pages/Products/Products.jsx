// src/pages/Products/Products.jsx
import React, { useEffect, useState } from 'react';
import CategoryProducts from '../../Components/CategoryProducts/CategoryProducts';
import { fetchAllProducts } from '../../api';

function Products() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const products = await fetchAllProducts();
        
        // ✅ Debug: Check what data you're getting
        console.log("Fetched products:", products);
        
        // ✅ Handle case where products might be nested in a data property
        const productArray = Array.isArray(products) ? products : products.data || [];
        
        if (productArray.length === 0) {
          setError("No products found");
          setLoading(false);
          return;
        }
        
        // Group by category
        const map = {};
        productArray.forEach(p => {
          const category = p.category || 'Uncategorized';
          if (!map[category]) map[category] = [];
          map[category].push(p);
        });
        
        const arr = Object.keys(map).map((c, i) => ({ 
          catId: i + 1, 
          category: c, 
          products: map[c] 
        }));
        
        console.log("Grouped products:", arr);
        setGroups(arr);
      } catch (err) {
        console.error("Failed to load products", err);
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <section className='py-10 text-center'>
        <p className='text-xl'>Loading products…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className='py-10 text-center'>
        <p className='text-xl text-red-500'>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
        >
          Retry
        </button>
      </section>
    );
  }

  if (groups.length === 0) {
    return (
      <section className='py-10 text-center'>
        <p className='text-xl'>No products available</p>
      </section>
    );
  }

  return (
    <section id='products' className='py-10'>
      {groups.map(group => (
        <CategoryProducts 
          key={group.catId} 
          product={group} 
          catId={group.catId} 
        />
      ))}
    </section>
  );
}

export default Products;

// ============================================
// Fixed CategoryProducts.jsx
// ============================================

