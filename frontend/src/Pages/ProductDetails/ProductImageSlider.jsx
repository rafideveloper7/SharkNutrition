import { useState } from "react";
import getImageUrl from "@/utils/imageHelper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { X } from "lucide-react";

const ProductImageSlider = ({ product }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLargeView, setIsLargeView] = useState(false);

    return (
        <>
            <div className="w-full lg:w-1/2 flex flex-col items-center relative">
                {/* Main Swiper */}
                <Swiper
                    modules={[Thumbs]}
                    slidesPerView={1}
                    spaceBetween={0}
                    thumbs={{ swiper: thumbsSwiper }}
                    onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                    className="my-swiper-parent w-full max-w-md rounded-2xl border-1 border-blue-400  overflow-hidden"
                >
                    {product.gallery.map((img, index) => (
                        <SwiperSlide key={index} className="my-swiper-child">
                            <div className="relative w-full max-w-[446px] h-fit sm:h-[400px] bg-black flex items-center justify-center rounded-2xl">
                                <img
                                    src={getImageUrl(img)}
                                    alt={product.name}
                                    draggable="false"
                                    className="w-full h-full object-contain select-none cursor-pointer"
                                    onClick={() => setIsLargeView(true)}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Thumbnail Swiper */}
                <Swiper
                    onSwiper={setThumbsSwiper}
                    slidesPerView={Math.min(product.gallery.length, 5)}
                    spaceBetween={10}
                    className="my-swiper-parent2 mt-4 w-full max-w-md"
                    modules={[Thumbs]}
                >
                    {product.gallery.map((img, index) => (
                        <SwiperSlide key={index} className="my-swiper-child2 cursor-pointer">
                            <img
                                src={getImageUrl(img)}
                                alt={`Thumbnail ${index}`}
                                className={`w-20 h-20 object-cover rounded-xl border-2 transition ${currentIndex === index
                                    ? "border-[#37b5fe]"
                                    : "border-transparent hover:border-[#37b5fe]"
                                    }`}
                                onClick={() => setCurrentIndex(index)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Large Image Modal */}
            {isLargeView && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <div className="relative max-w-4xl max-h-full w-full">
                        <button
                            onClick={() => setIsLargeView(false)}
                            className="absolute top-4 right-4 z-10 bg-[#37b5fe] p-2 rounded-full transition hover:scale-110"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <div className="relative overflow-hidden bg-black">
                            <TransformWrapper
                                minScale={1}
                                maxScale={4}
                                pinch={{ step: 5 }}
                                wheel={{ step: 0.15 }}
                                panning={{ velocityDisabled: true }}
                                centerOnInit
                                doubleClick={{ mode: "reset" }}
                            >
                                <TransformComponent wrapperClass="w-full h-full">
                                    <img
                                        src={getImageUrl(product.gallery[currentIndex])}
                                        alt={product.name}
                                        draggable="false"
                                        className="w-full max-h-[80vh] object-contain select-none"
                                    />
                                </TransformComponent>
                            </TransformWrapper>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductImageSlider;
