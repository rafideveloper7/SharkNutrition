import './Categories.css'
import ScrollContainer from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import { products } from '../../data';

function Categories() {
    return (
        <section id='categories' className='py-10 px-5'>
            <h2 className='text-3xl text-center font-medium pb-5'>SHOP BY CATEGORIES</h2>
            <ScrollContainer
                className="category-items flex justify-center gap-[5vw] py-5 active:cursor-grab overflow-x-auto"
                vertical={false}>
                {
                    products?.map(item => (
                        <a href={`#${item?.category.toLowerCase().replace(/\s+/g, '-')}`} key={item?.catId}>
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