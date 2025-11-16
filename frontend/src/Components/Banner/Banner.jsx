import "./Banner.css";
import heroImg from "../../assets/hero.jpg";

function Banner() {
  return (
    <section id="banner" className="relative w-full">
      <img
        className="banner-img w-full h-[75vh] object-cover"
        src={heroImg}
        alt="banner"
      />

      <div
        className="
      absolute left-1/2 -translate-x-1/2
      w-[90%] text-center text-white
      bottom-[5%]
      md:w-[60%] md:bottom-[10%]
    "
      >
        <h1 className="text-[26px] md:text-[32px] font-bold mb-3">
          WELCOME TO SHARK NUTRITION
        </h1>

        <p className="text-[15px] md:text-[16px] leading-6 md:leading-15">
          Unlock your best self with our products. Whether you're a fitness
          fanatic, a sports star, or leveling up your wellness game, we've got
          the perfect supplements for you. We handpick authentic products from
          top global brands, ensuring only the best reaches you.
        </p>
      </div>
    </section>
  );
}

export default Banner;
