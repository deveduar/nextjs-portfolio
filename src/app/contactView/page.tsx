import ContactForm from "@/components/contactForm";
import ProjectBreadcrumb from "@/components/projectBreadcrumb";
import ProfileHeader from "@/components/profileHeader";
import profile from "@/data/profile";

export default function ContactView() {

    return (
      <div className="flex flex-col">
        <ProjectBreadcrumb />
        <div className="bg-gray-100 dark:bg-gray-950 -mx-2 px-2 md:-mx-12 md:px-12 lg:-mx-50 lg:px-50 xl:-mx-60 xl:px-60 py-4">
          <div className="mb-6">
            <ProfileHeader name={profile.name} specialty={profile.specialty} />
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-300">Let&apos;s Connect</h2>
            <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
              Have a project in mind? I&apos;d love to hear about it. Send me a message!
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    );
}