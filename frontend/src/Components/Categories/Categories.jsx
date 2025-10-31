import './Categories.css'
import ScrollContainer from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import { useState, useEffect } from 'react';
import { fetchAllProducts } from '../../api';

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const products = await fetchAllProducts();
                
           
                const categoryMap = {};
                products.forEach(p => {
                    const cat = p.category || 'Uncategorized';
                    if (!categoryMap[cat]) {
                        categoryMap[cat] = {
                            category: cat,
                            image: p.image || ''
                        };
                    }
                });
                
                setCategories(Object.values(categoryMap));
            } catch (err) {
                console.error("Failed to load categories", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <section id='categories' className='py-10 px-5'>
                <h2 className='text-3xl text-center font-medium pb-5'>SHOP BY CATEGORIES</h2>
                <p className='text-center'>Loading categories...</p>
            </section>
        );
    }

    return (
        <section id='categories' className='py-10 px-5'>
            <h2 className='text-3xl text-center font-medium pb-5'>SHOP BY CATEGORIES</h2>
            <ScrollContainer
                className="category-items flex justify-center gap-[5vw] py-5 active:cursor-grab overflow-x-auto"
                vertical={false}>
                {
                    categories?.map((item, index) => (
                        <a href={`#${item?.category.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
                            <div className='text-center'>
                                <div className="image w-[10vw] h-[10vw] bg-[#bbb] rounded-full mb-5">
                                    <img className='w-full h-full object-cover rounded-full drop-shadow-[0_5px_5px_#444]' src={item?.image} alt="" />
                                </div>
                                <h3>{item?.category}</h3>
                            </div>
                        </a>
                    ))
                }
            </ScrollContainer>
        </section>
    )
}

export default Categories

/*



bg for gem nutrition products
*/