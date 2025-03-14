"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import emailjs from '@emailjs/browser';

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
    <>
    <ToastContainer />
    <form onSubmit={handleSubmit} className="flex flex-col gap-4  mx-auto align-middle ">
    <div>
        <label className="block text-gray-700 dark:text-gray-300">Your Name:</label>
        <input
        type="text"
        name="name"
        value={userInput.name}
        onChange={handleChange}
        className="p-3 border rounded-lg w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        />
    </div>
    <div>
        <label className="block text-gray-700 dark:text-gray-300">Your Email:</label>
        <input
        type="email"
        name="email"
        value={userInput.email}
        onChange={handleChange}
        className="p-3 border rounded-lg w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        />
    </div>
    <div>
        <label className="block text-gray-700 dark:text-gray-300">Your Message:</label>
        <textarea
        name="message"
        value={userInput.message}
        onChange={handleChange}
        className="p-3 border rounded-lg w-full h-32 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        />
    </div>
    <button 
        type="submit" 
        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600">
        Send Message
    </button>
    </form>
    </>


  );
}
