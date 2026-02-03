import "./Banner.css";
import heroImg from "../../assets/hero.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import videoOne from "../../assets/videos-for-hero/1.mov";
import videoTwo from "../../assets/videos-for-hero/2.MP4";
import videoThree from "../../assets/videos-for-hero/3.MOV";
import videoFour from "../../assets/videos-for-hero/4.MOV";
import videoFive from "../../assets/videos-for-hero/5.mov";
import videoSix from "../../assets/videos-for-hero/6.MOV";
import videoSeven from "../../assets/videos-for-hero/7.MP4";

function Banner() {
  // Store video sources in an array
  const videoSources = [
    videoOne,
    videoTwo,
    videoThree,
    videoFour,
    videoFive,
    videoSix,
    videoSeven,
  ];

  return (
    <section id="banner" className="relative w-full h-auto">
      {/* Banner Image Background */}
      <img
        className="banner-img absolute inset-0 w-full h-full object-cover mt-[-35px]"
        src={heroImg}
        alt="banner"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 py-20 mt-56">
        {/* Title */}
        <h1 className="text-[26px] md:text-[32px] font-bold mb-8 text-white text-center">
          WELCOME TO <br /> SHARK NUTRITION
        </h1>

        {/* Video Slider */}
        <div className="w-[90%] md:w-[70%] lg:w-[60%] mt-8">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            className="rounded-lg overflow-hidden shadow-2xl"
          >
            {videoSources.map((videoSrc, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[350px] bg-black grid place-items-center overflow-hidden">
                  <video
                    className="w-auto h-auto max-w-full max-h-full"
                    src={videoSrc}
                    alt={`video-${index + 1}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls={false}
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
