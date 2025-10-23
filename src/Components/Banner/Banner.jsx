import './Banner.css'
function Banner() {
    return (
        <section id="banner" className='h-[30vw] text-center p-5 flex justify-center items-center'>
            <div className='bg-[#0000005b] p-5 max-w-200 mx-auto'>
                <h1 className='text-[2.5vw] font-semibold mb-3'>Welcome to Shark Nutrition</h1>
                <p className='leading-[1.5vw] text-[0.8vw]'>
                    Whether you're a fitness enthusiast, athlete, or simply looking to upgrade your health and wellness routine, we've got you covered. Browse our collection today and experience the difference for yourself. Shark nutrition is your trusted destination for top- notch supplements! We pride ourselves on offering a curated selection of authentic products from renowned brands, carefully sourced from around the globe. We ensure that every item that leaves our warehouse meets the highest standards. Our customers trust us for exceptional products, outstanding customer service and dedication to their satisfaction. Join our community and discover a healthier, stronger you!
                </p>
            </div>
        </section>
    )
}

export default Banner