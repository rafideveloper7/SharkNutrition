import './Banner.css'
import heroImg from '../../assets/hero.jpg'

function Banner() {
    return (
        <section id="banner">
            <img className='hero-image' src={heroImg} alt="banner" />
        </section>
    )
}

export default Banner