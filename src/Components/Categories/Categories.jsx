// import proteinImg from '../../assets/protein.png';
// import creatineImg from '../../assets/creatine.png';
// import preWorkoutImg from '../../assets/pre-workout.png';
// import weightGainerImg from '../../assets/weight-gainer.png';
// import aminoImg from '../../assets/amino-acid.png';
// import vitaminsImg from '../../assets/vitamins-and-minerals.png';
// import './Categories.css'
// import ScrollContainer from "react-indiana-drag-scroll";
// import "react-indiana-drag-scroll/dist/style.css";
// import { Link } from 'react-router-dom';

// function Categories() {
//     const categories = [
//         { id: 1, category: 'Protein', image: proteinImg },
//         { id: 2, category: 'Creatine', image: creatineImg },
//         { id: 3, category: 'Pre Workouts', image: preWorkoutImg },
//         { id: 4, category: 'Weight Gainers', image: weightGainerImg },
//         { id: 5, category: 'Amino Acids', image: aminoImg },
//         { id: 6, category: 'Vitamins and Minerals', image: vitaminsImg },
//     ]
//     return (
//         <section id='categories' className='py-10 px-5'>
//             <h2 className='text-3xl text-center font-medium pb-5'>SHOP BY CATEGORIES</h2>
//             <ScrollContainer
//                 className="category-items flex justify-center gap-10 py-5 active:cursor-grab overflow-x-auto"
//                 vertical={false}>
//                 {
//                     categories?.map(item => (
//                         <Link>
//                             <div className='text-center' key={item?.id}>
//                                 <div className="image w-[10vw] h-[10vw] bg-[#bbb] rounded-full p-5 mb-5">
//                                     <img className='w-full h-full object-cover' src={item?.image} alt="" />
//                                 </div>
//                                 <h3>{item?.category}</h3>
//                             </div>
//                         </Link>
//                     ))
//                 }
//             </ScrollContainer>
//         </section>
//     )
// }

// export default Categories

import React from 'react'

function Categories() {
  return (
    <div>Categories</div>
  )
}

export default Categories