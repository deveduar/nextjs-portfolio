"use client";
import { useState } from "react";
import Link from "next/link";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import profile from "@/data/profile";

interface FormData {
  name: string;
  email: string;
  message: string;
  [key: string]: string;
}

const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export default function ContactSection() {
  const [lastSent, setLastSent] = useState<number | null>(null);
  const cooldownTime = 5 * 60 * 1000;

  const [userInput, setUserInput] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (lastSent && Date.now() - lastSent < cooldownTime) {
      toast.error("You must wait before sending another message.");
      return;
    }

    if (!serviceID || !templateID || !userID) {
      toast.error("Error: Missing EmailJS configuration!");
      return;
    }

    try {
      const emailParams: FormData = {
        name: userInput.name,
        email: userInput.email,
        message: userInput.message
      };

      const res = await emailjs.send(serviceID, templateID, emailParams, userID);

      if (res.status === 200) {
        toast.success("Message sent successfully!");
        setUserInput({ name: "", email: "", message: "" });
        const now = Date.now();
        setLastSent(now);
        localStorage.setItem("lastSent", now.toString());
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <section className="flex flex-col justify-center px-4 py-8 min-h-screen bg-violet-100 dark:bg-violet-950/40">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Let&apos;s Connect
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto w-full">
          {/* Contact Form */}
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Have a project in mind? I&apos;d love to hear about it. Send me a message!
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <input
                  type="text"
                  name="name"
                  value={userInput.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-3 bg-white/50 dark:bg-gray-800/50 border-b border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={userInput.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full p-3 bg-white/50 dark:bg-gray-800/50 border-b border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={userInput.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="w-full p-3 bg-white/50 dark:bg-gray-800/50 border-b border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 h-28 placeholder:text-gray-400 resize-none"
                  required
                />
              </div>
              <button 
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 self-start"
              >
                Send Message
              </button>
            </form>
            <ToastContainer />
          </div>

          {/* Social Links */}
          <div className="flex flex-col justify-center items-center md:items-start gap-4">
            <p className="text-gray-600 dark:text-gray-300 text-center md:text-left">
              Connect with me on social media or check out my work on GitHub.
            </p>
            <div className="flex gap-3">
              <Link 
                href={profile.socialLinks.linkedin}
                target="_blank" 
                className="p-3 flex items-center justify-center hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                <FaLinkedin className="w-6 h-6 text-gray-900 dark:text-white" />
              </Link>
              <Link 
                href={profile.socialLinks.twitter}
                target="_blank" 
                className="p-3 flex items-center justify-center hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                <FaTwitter className="w-6 h-6 text-gray-900 dark:text-white" />
              </Link>
              <Link 
                href={profile.socialLinks.github}
                target="_blank" 
                className="p-3 flex items-center justify-center hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                <FaGithub className="w-6 h-6 text-gray-900 dark:text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}