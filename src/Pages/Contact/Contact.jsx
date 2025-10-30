import FAQSection from "../../Components/According/FaqAcording";
import ContactForm from "../../Components/ContactForm/ContactForm";

function Contact() {
  return (
    <>
      {/* need help sec */}
      <div className="text-center m-2 mb-10 ">
        <h4 className="text-[48px] font-[500] leading-[3] text-center w-[281.484] m-auto">
          Need Help?
        </h4>
        <h4 className="p-5 text-[24px] font-[500]">Contact us Via Whatsapp!</h4>
        <p className="p-3 text-[18px]">
          During business hours please send us a message at <span className="text-blue-300">+92 330 2721777</span>
        </p>
        <h4 className="p-5 text-[24px] font-[500]">Contact Us Via Call!</h4>
        <p className="p-3 text-[18px]">
          During business Hours please Call Us At <span className="text-blue-300">+92 330 2721777</span>
        </p>
        <h4 className="p-5 text-[24px] font-[500]">Email Us!</h4>
        <p className="p-3 text-[18px]">
          During business hours please send us a message at <span className="text-blue-300">sharknutrition.pk@gmail.com</span>
        </p>
      </div>

      <div className="w-full flex flex-wrap justify-around">
        <div className="w-full md:w-[40%] h-fit m-5 p-5 rounded">
          <FAQSection />
        </div>
        <div className="w-full md:w-[50%] h-fit m-5">
          <ContactForm />
        </div>
      </div>
    </>
  );
}

export default Contact;
