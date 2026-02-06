import heroImg from "../../assets/hero.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import slideOne from "../../assets/videos-for-hero/Slide 1.PNG";
import slideTwo from "../../assets/videos-for-hero/Slide 2.PNG";
import slideThree from "../../assets/videos-for-hero/Slide 3.PNG";
import slideFour from "../../assets/videos-for-hero/Slide 4.PNG";
import slideFive from "../../assets/videos-for-hero/Slide 5.PNG";
import slideSix from "../../assets/videos-for-hero/Slide 6.PNG";

function Banner() {
  const videos = [
    { src: slideOne, category: "" },
    { src: slideTwo, category: "protein" },
    { src: slideThree, category: "creatine" },
    { src: slideFour, category: "pre-workout" },
    { src: slideFive, category: "amino-acid" },
    { src: slideSix, category: "accessories" },
  ];

  const handleScroll = (categoryId) => {
    const section = document.getElementById(categoryId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full">

      {/* Banner Image */}
      <div className="w-full bg-black flex justify-center">
        <img
          src={heroImg}
          alt="banner"
          className="w-full h-auto object-contain md:h-[75vh] md:object-cover lg:mt-12 lg:w-[90%]"
        />
      </div>

      {/* Content */}
      <div className="bg-black text-white py-12 px-4 text-center -mt-6 lg:-mt-72">
        
        {/* <h1 className="text-2xl md:text-4xl font-bold mb-8 lg:text-5xl">
          WELCOME TO <br /> SHARK NUTRITION
        </h1> */}

        <div className="w-full max-w-4xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="rounded-lg overflow-hidden shadow-2xl"
          >
            {videos.map((video) => (
              <SwiperSlide key={video.category}>
                <div
                  onClick={() => handleScroll(video.category)}
                  className="w-full aspect-video bg-black rounded-lg overflow-hidden cursor-pointer"
                >
                  <img
                    className="w-full h-full object-cover"
                    src={video.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>

    </section>
  );
}

export default Banner;
