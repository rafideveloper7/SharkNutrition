import { fetchAllProducts } from "@/api";

export async function loadProductsAndCategories() {
    const [productsResponse, categoriesResponse] = await Promise.all([
        fetchAllProducts(),
        fetch(`${import.meta.env.VITE_API_BASE}/api/categories`).then((res) =>
            res.json()
        ),
    ]);

    let productArray = [];

    if (Array.isArray(productsResponse)) {
        productArray = productsResponse;
    } else if (productsResponse?.data && Array.isArray(productsResponse.data)) {
        productArray = productsResponse.data;
    } else if (
        productsResponse?.products &&
        Array.isArray(productsResponse.products)
    ) {
        productArray = productsResponse.products;
    }

    const categories = categoriesResponse.categories || [];

    categories.sort((a, b) => {
        const orderA =
            a.sliderOrder !== undefined && a.sliderOrder !== null
                ? a.sliderOrder
                : 9999;
        const orderB =
            b.sliderOrder !== undefined && b.sliderOrder !== null
                ? b.sliderOrder
                : 9999;
        return orderA - orderB;
    });

    const categoryOrderMap = {};
    categories.forEach((cat, index) => {
        categoryOrderMap[cat.name.toLowerCase().trim()] = index;
    });

    const categoryMap = {};
    productArray.forEach((product) => {
        const categoryKey = product.category
            ? product.category.toLowerCase().trim()
            : "uncategorized";

        if (!categoryMap[categoryKey]) {
            categoryMap[categoryKey] = [];
        }

        categoryMap[categoryKey].push(product);
    });

    const groupedArray = Object.keys(categoryMap).map((key, index) => {
        const matchedCategory = categories.find(
            (c) => c.name.toLowerCase().trim() === key
        );

        const displayName = matchedCategory
            ? matchedCategory.name
            : key.charAt(0).toUpperCase() + key.slice(1);

        return {
            catId: index + 1,
            category: displayName,
            products: categoryMap[key],
            sortIndex: categoryOrderMap[key] !== undefined ? categoryOrderMap[key] : 9999,
        };
    });

    groupedArray.sort((a, b) => a.sortIndex - b.sortIndex);

    return groupedArray;
}
