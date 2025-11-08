import './Banner.css'
import heroImg from '../../assets/hero.jpg'
import shark from '../../assets/shark.png'
function Banner() {
    return (
        <section id="banner" className='h-[30vw] text-center p-5 flex justify-center items-center relative'>
            <h2 className='bg-[#00000098] h-[fit-content] text-[clamp(1.5rem,calc(2vw),2.25rem)] text-[clamp(1.5rem,calc(2vw),2.25rem)] uppercase font-medium flex items-center'>Dive into authenticity <img className='w-10 h-10 object-cover relative scale-130' src={shark} alt="" /></h2>
            <img className='absolute z-[-1] w-[90%] top-[-10%] object-cover' src={heroImg} alt="" />
        </section>
    )
}

export default Banner