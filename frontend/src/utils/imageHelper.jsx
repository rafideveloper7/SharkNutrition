// src/utils/imageHelper.js

/**
 * Converts any image path to full URL
 * @param {string} imagePath - Image path from database
 * @returns {string} Full image URL
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/images/placeholder.png';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/uploads')) return `http://localhost:5000${imagePath}`;
  return `http://localhost:5000/uploads/${imagePath}`;
};

export default getImageUrl;