import React from "react";
import Card from "@/components/card";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"
import FooterB from "@/components/footerB"
import About from "@/components/about"

const Home: React.FC = () => {
  return (
    <section className=" bg-gray-300 dark:bg-gray-950">
      <Navbar />

      <div className="container mx-auto py-6 bg-gray-300 dark:bg-gray-950	">
        {/* <h1 className="text-4xl font-bold text-center my-8">
          Deveduar Portfolio
        </h1> */}
        <Hero
          title="Hey 👋 I am deveduar"
          subtitle="I'm a Full-Stack Developer specialized in building amazing web applications."
          imageSrc="/images/pc-1.png"
        />
          <About />



        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 my-8">
            Projects
        </h2>

        <div
          id="projects"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-1 justify-items-center"
        >
          <Card
            title="Project 1"
            description="Description for project 1"
            imageSrc="/images/pc-1.png"
            detailedDescription="This is a detailed description for project 1"
          />
          <Card
            title="Project 2"
            description="Description for project 2"
            imageSrc="/images/pc-1.png"
            detailedDescription="This is a detailed description for project 1"
          />
          <Card
            title="Project 3"
            description="Description for project 3"
            imageSrc="/images/pc-1.png"
            detailedDescription="This is a detailed description for project 1"
          />
        </div>
      </div>
      {/* <FooterB /> */}
      <Footer />

    </section>
  );
};

export default Home;
