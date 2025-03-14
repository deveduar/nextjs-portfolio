import ContactForm from "@/components/contactForm";



export default function AboutView() {

    return (
      <section className="w-full flex justify-center px-4">
      <div className=" w-full bg-white dark:bg-gray-900  p-8 rounded-lg max-w-md">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Send me a message
        </h3>
        <ContactForm />
      </div>
    </section>
    );
  }
  