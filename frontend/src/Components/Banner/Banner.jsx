import './Banner.css'
import heroImg from '../../assets/hero.jpg'
import shark from '../../assets/shark.png'
import protein1 from '../../assets/protein1.png'
import protein3 from '../../assets/protein3.png'
import protein4 from '../../assets/protein4.png'
import creatine1 from '../../assets/creatine1.png'
import preworkout1 from '../../assets/preworkout1.png'
import weightGainer1 from '../../assets/weight-gainer1.png'
function Banner() {
    return (
        <section id="banner" className='h-[30vw] text-center p-5 flex justify-center items-center relative'>
            <h2 className='bg-[#00000098] h-[fit-content] text-[clamp(1.5rem,calc(2vw),2.25rem)] text-[clamp(1.5rem,calc(2vw),2.25rem)] uppercase font-medium flex items-center'>Dive into authenticity <img className='w-10 h-10 object-cover relative scale-130' src={shark} alt="" /></h2>
            <img className='absolute z-[-1] w-[90%] top-[-10%] object-cover' src={heroImg} alt="" />
             <div className="left-items w-[21vw] h-[21vw] absolute left-0 bottom-0">
                <img className='w-[50%] absolute bottom-0 left-0' src={protein1} alt="" />
                <img className='w-[50%] absolute bottom-0 right-0' src={protein3} alt="" />
                <img className='w-[50%] absolute bottom-[-30%] left-[30%]' src={protein4} alt="" />
            </div>
            <div className="right-items w-[21vw] h-[21vw] absolute right-0 bottom-0">
                <img className='w-[50%] absolute bottom-0 right-0' src={preworkout1} alt="" />
                <img className='w-[50%] absolute bottom-[-30%] left-[30%]' src={weightGainer1} alt="" />
                <img className='w-[50%] absolute bottom-0 left-0' src={creatine1} alt="" />
            </div>
        </section>
    )
}

export default Banner