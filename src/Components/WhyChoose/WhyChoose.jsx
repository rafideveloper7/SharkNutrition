
function WhyChoose() {
    return (
        <section id="why-choose" className="py-16 px-5 text-center bg-[#0b0b0b] text-white">
            <h2 className="text-[2vw] font-semibold mb-5 tracking-wide">WHY CHOOSE SHARK NUTRITION</h2>
            <p className="max-w-3xl text-[0.9vw] mx-auto text-[#bbb] mb-12 leading-relaxed">
                Because we know that athletes and bodybuilders in Pakistan need real products and real results.
                With us, you get a wide range of authentic supplements at unbeatable prices — without compromising
                on quality. Fast delivery with live tracking and 24/7 customer support.
            </p>

            <div className="flex justify-around flex-wrap gap-10 justify-items-center">
                <div className="flex flex-col items-center bg-[#141414] p-6 rounded-4xl shadow-lg hover:shadow-[0_0_20px_#ffffff33] transition-all duration-300 w-full md:w-80">
                    <i className="fa-solid fa-medal text-4xl text-blue-400 mb-4"></i>
                    <h3 className="text-xl font-medium mb-3">Authentic Products</h3>
                    <p className="text-[#ccc] text-[0.8vw] text-sm leading-relaxed">
                        100% original and lab-tested supplements sourced directly from trusted international brands.
                        No fakes, no compromises — only real gains for real athletes.
                    </p>
                </div>
                <div className="flex flex-col items-center bg-[#141414] p-6 rounded-4xl shadow-lg hover:shadow-[0_0_20px_#ffffff33] transition-all duration-300 w-full md:w-80">
                    <i className="fa-solid fa-truck-fast text-4xl text-blue-400 mb-4"></i>
                    <h3 className="text-xl font-medium mb-3">Fast Delivery</h3>
                    <p className="text-[#ccc] text-sm leading-relaxed">
                        Experience lightning-fast delivery like never before. Get your orders delivered swiftly,
                        right to your doorstep with live order tracking.
                    </p>
                </div>
                <div className="flex flex-col items-center bg-[#141414] p-6 rounded-4xl shadow-lg hover:shadow-[0_0_20px_#ffffff33] transition-all duration-300 w-full md:w-80">
                    <i className="fa-solid fa-rotate-left text-4xl text-blue-400 mb-4"></i>
                    <h3 className="text-xl font-medium mb-3">Return Policy</h3>
                    <p className="text-[#ccc] text-sm leading-relaxed">
                        Shop with confidence knowing our hassle-free return policy ensures your satisfaction.
                        We stand by the quality of every supplement — guaranteed.
                    </p>
                </div>
            </div>
        </section>

    )
}

export default WhyChoose