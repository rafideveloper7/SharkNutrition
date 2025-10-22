import proteinImg from '../../assets/protein.png';
import creatineImg from '../../assets/creatine.png';
import preWorkoutImg from '../../assets/pre-workout.png';
import weightGainerImg from '../../assets/weight-gainer.png';
import aminoImg from '../../assets/amino-acid.png';
import vitaminsImg from '../../assets/vitamins-and-minerals.png';
import './Categories.css'

function Categories() {
    const categories = [
        { id: 1, category: 'Protein', image: proteinImg },
        { id: 1, category: 'Creatine', image: creatineImg },
        { id: 1, category: 'Pre Workouts', image: preWorkoutImg },
        { id: 1, category: 'Weight Gainers', image: weightGainerImg },
        { id: 1, category: 'Amino Acids', image: aminoImg },
        { id: 1, category: 'Vitamins and Minerals', image: vitaminsImg },
    ]
    return (
        <section id='categories' className='py-10 px-5'>
            <h2 className='text-3xl text-center font-medium pb-5'>SHOP BY CATEGORIES</h2>
            <div className="category-items flex gap-10 justify-center py-5">
                {
                    categories?.map(item => (
                        <div className='text-center' key={item?.id}>
                            <div className="image w-[10vw] h-[10vw] bg-[#bbb] rounded-full p-5 mb-5">
                                <img className='w-full h-full object-cover' src={item?.image} alt="" />
                            </div>
                            <h3>{item?.category}</h3>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Categories