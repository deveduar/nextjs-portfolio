import ContactForm from "@/components/contactForm";



export default function ContactView() {

    return (
      <section className="w-full flex  ">
      {/* <div className=" w-full bg-white dark:bg-gray-900  p-8 rounded-lg lg:max-w-xl mx-auto ">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Send me a message
        </h3>
      </div> */}
      <ContactForm />

    </section>
    );
  }
  