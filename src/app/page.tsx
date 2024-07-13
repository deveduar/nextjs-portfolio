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

        <div id="about">
        <Hero
          title="Hey 👋 I am deveduar"
          subtitle="I'm a Full-Stack Developer specialized in building amazing web applications."
          imageSrc="/images/profile.jpeg"
        />
          
        </div>




        {/* <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 my-8">
            Projects
        </h2> */}
        
          <div id="projects" className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white py-7 space-y-2 rounded-xl mt-7 text-center">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-8 ml-4">Projects</h2>
            <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-1 justify-items-center px-4">
              <Card
                title="Personal Blog"
                description="Description for project 1"
                imageSrc="/images/blog-1.png"
                detailedDescription="This is a detailed description for project 1"
              />
              <Card
                title="Ecomerce Site"
                description="Description for project 2"
                imageSrc="/images/blog-1.png"
                detailedDescription="This is a detailed description for project 2"
              />
              <Card
                title="Music Platform"
                description="Description for project 3"
                imageSrc="/images/blog-1.png"
                detailedDescription="This is a detailed description for project 3"
              />
            </div>
          </div>
      <About />

      </div>

      {/* <FooterB /> */}
      <Footer />

    </section>
  );
};

export default Home;
