"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaEnvelope, FaUser,FaGithub, FaTwitter, FaLinkedin, FaComment } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import profile from "@/data/profile";
import Image from "next/image";
import Link from "next/link";
// Definimos la interfaz
interface FormData {
    name: string;
    email: string;
    message: string;
    [key: string]: string; 
  }

const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  

export default function ContactForm() {

  const [lastSent, setLastSent] = useState<number | null>(null);
  const cooldownTime = 5 * 60 * 1000;

  const [userInput, setUserInput] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  });

    // Cargar lastSent desde localStorage cuando el componente se monta
    useEffect(() => {
        const storedLastSent = localStorage.getItem("lastSent");
        if (storedLastSent) {
            setLastSent(parseInt(storedLastSent, 10));
        }
    }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (lastSent && Date.now() - lastSent < cooldownTime) {
        toast.error("You must wait before sending another message.");
        return;
      }

    // Comprobación de las variables de entorno
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
        setUserInput({
          name: "",
          email: "",
          message: ""
        });
        const now = Date.now();
        setLastSent(now);
        localStorage.setItem("lastSent", now.toString());
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="w-full grid grid-cols-6 gap-4" data-aos="fade-up">
    {/* Panel Principal */}
    <div className="col-span-6 md:col-span-4 bg-white dark:bg-gray-800 rounded-xl p-6">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Let&#39;s Connect</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Have a project in mind? I&#39;d love to hear about it. Send me a message and let&#39;s chat!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <div className="flex items-center gap-2">
                  <FaUser className="text-gray-400" />
                  Your Name
                </div>
              </label>
              <input
                type="text"
                name="name"
                value={userInput.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-gray-400" />
                  Your Email
                </div>
              </label>
              <input
                type="email"
                name="email"
                value={userInput.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <div className="flex items-center gap-2">
                <FaComment className="text-gray-400" />
                Your Message
              </div>
            </label>
            <textarea
              name="message"
              value={userInput.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 h-32"
              required
            />
          </div>

          <button 
            type="submit"
            className="self-start px-6 py-3 bg-blue-200 dark:bg-blue-900 text-gray-900 dark:text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>

    {/* Panel Lateral */}
    <div className="col-span-6 md:col-span-2 flex flex-col gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 ">
        <div className="flex flex-row md:flex-col justify-between">
          <div className="flex flex-col justify-between w-full">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
          
          <div className="flex flex-row md:flex-row items-center md:items-center gap-4 md:gap-6 w-full ">
            <div className="flex-shrink-0 w-20 h-20">
              <Image
                src="/images/profile.jpeg"
                alt="Profile Avatar"
                width={150}
                height={150}
                className="rounded-full shadow-lg"
                priority
              />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{profile.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{profile.specialty}</p>
            </div>
          </div>

        <div className="flex  justify-between flex-row md:flex-col w-full">
          <div className="flex flex-col gap-4 md:gap-3 mt-4">
            <p className="text-gray-600 dark:text-gray-300 text-sm truncate">
              📍 Based in Spain
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm truncate">
              🕒 Available for projects
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm truncate">
              💼 Open to collaborations
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 mt-4 md:mt-6 md:justify-center">
            <Link href={profile.socialLinks.github} target="_blank" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              <FaGithub size={28} />
            </Link>
            <Link href={profile.socialLinks.linkedin} target="_blank" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              <FaLinkedin size={28} />
            </Link>
            <Link href={profile.socialLinks.twitter} target="_blank" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              <FaTwitter size={28} />
            </Link>
          </div>
        </div>

          </div>

          

        </div>
      </div>
    </div>

    <ToastContainer />
  </div>


  );
}
