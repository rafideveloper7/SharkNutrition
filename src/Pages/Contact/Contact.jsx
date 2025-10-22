import FAQSection from "../../Components/According/FaqAcording";
import ContactForm from "../../Components/ContactForm/ContactForm";

function Contact() {
  return (
    <>
      {/* need help sec */}
      <div className="text-center mb-20">
        <h4 className="text-[56px] font-[500] leading-[3] text-center w-[281.484]">
          Need Help ?
        </h4>
        <h4 className="p-5 text-[24px] font-[500]">Contact us Via Whatsapp!</h4>
        <p className="p-5 text-[18px]">
          During business hours please send us a message at +923046584342
        </p>
        <h4 className="p-5 text-[24px] font-[500]">Contact Us Via Call!</h4>
        <p className="p-5 text-[18px]">
          During business Hours please Call Us At +923046584342
        </p>
        <h4 className="p-5 text-[24px] font-[500]">Email Us!</h4>
        <p className="p-5 text-[18px]">
          During business hours please send us a message at +923046584342
        </p>
      </div>

      <div className="w-full  flex flex-wrap justify-around">
        <div>
          <FAQSection />
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </>
  );
}

export default Contact;
