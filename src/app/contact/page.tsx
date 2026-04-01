import ContactForm from "@/components/contactForm";
import ProjectBreadcrumb from "@/components/projectBreadcrumb";
import ProfileHeader from "@/components/profileHeader";
import Link from "next/link";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import profile from "@/data/profile";

export default function ContactView() {

    return (
      <div className="flex flex-col">
        <ProjectBreadcrumb />
        <div className="bg-gray-100 dark:bg-gray-950 -mx-2 px-2 md:-mx-12 md:px-12 lg:-mx-50 lg:px-50 xl:-mx-60 xl:px-60 py-4">
          <div className="mb-6">
            <ProfileHeader name={profile.name} specialty={profile.specialty} />
          </div>
          
          <div className="flex gap-2 mb-6 justify-end">
            <Link 
              href={profile.socialLinks.linkedin}
              className="flex items-center gap-1 hover:opacity-70 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-5 h-5 text-gray-900 dark:text-white" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">LinkedIn</span>
            </Link>
            <Link 
              href={profile.socialLinks.twitter}
              className="flex items-center gap-1 hover:opacity-70 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-5 h-5 text-gray-900 dark:text-white" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Twitter</span>
            </Link>
            <Link 
              href={profile.socialLinks.github}
              className="flex items-center gap-1 hover:opacity-70 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="w-5 h-5 text-gray-900 dark:text-white" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">GitHub</span>
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-300">Let&apos;s Connect</h2>
              <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
                Have a project in mind? I&apos;d love to hear about it. Send me a message!
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    );
}