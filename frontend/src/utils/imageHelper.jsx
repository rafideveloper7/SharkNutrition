// src/utils/imageHelper.js
const backendApi = import.meta.env.VITE_API_BASE
/**
 * Converts any image path to full URL
 * @param {string} imagePath - Image path from database
 * @returns {string} Full image URL
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/images/placeholder.png';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/uploads')) return backendApi + imagePath;
  return backendApi + imagePath;
};

export default getImageUrl;