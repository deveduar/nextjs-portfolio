import React from "react";
import Card from "@/components/card";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"
// import FooterB from "@/components/footerB"
import About from "@/components/about"



const Home: React.FC = () => {
  return (
    <section className=" bg-gray-300 dark:bg-gray-950">
      <Navbar />
      <div className="container mx-auto py-6 bg-gray-300 dark:bg-gray-950	">

        <div id="">
        <Hero
          title="Hey, I am deveduar"
          subtitle="I'm a Full-Stack Developer specialized in building amazing web applications."
          imageSrc="/images/profile.jpeg"
          // imageSrc="/images/pc-1.png"
        />
          
        </div>
        <div id="about">
        <About />
        </div>



        {/* <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 my-8">
            Projects
        </h2> */}
        
          <div id="projects" className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white py-7 space-y-2 rounded-xl mt-7 text-center">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-8 ml-4">Projects</h2>
            <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-1 justify-items-center px-4">
              <Card
                title="Deveduar Blog"
                description="Responsive blog created with Next.js and React.js"
                imageSrc="/images/blog-1.png"
                detailedDescription="My Personal blog for reading markdown posts from the file system with tags and date system"
                links={[
                  {
                    href: "https://github.com/deveduar/nextjs-blog",
                    label: "GitHub",
                    svg: (
                      <svg className="hover:scale-110 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z" />
                    </svg>
                    )
                  },
                  {
                    href: "https://nextjs-blog-xi-indol.vercel.app/",
                    label: "Demo",
                    svg: (
                      <svg className="hover:scale-110 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 15.889v-2.223s-3.78-.114-7 3.333c1.513-6.587 7-7.778 7-7.778v-2.221l5 4.425-5 4.464z" />
                      </svg>
                    )
                  }
                ]}         
              />
              <Card
                title="Ecomerce VisualEvoke"
                description="A ecomerce shop made with next js and medusa js"
                imageSrc="/images/blog-1.png"
                detailedDescription="This is a detailed description for project 2"
                links={[
                  {
                    href: "https://github.com/deveduar/nextjs-blog",
                    label: "GitHub",
                    svg: (
                      <svg className="hover:scale-110 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z" />
                    </svg>
                    )
                  },
                  {
                    href: "https://nextjs-blog-xi-indol.vercel.app/",
                    label: "Demo",
                    svg: (
                      <svg className="hover:scale-110 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 15.889v-2.223s-3.78-.114-7 3.333c1.513-6.587 7-7.778 7-7.778v-2.221l5 4.425-5 4.464z" />
                      </svg>
                    )
                  }
                ]}  
              />
              <Card
                title="Music Platform"
                description="Description for project 3"
                imageSrc="/images/blog-1.png"
                detailedDescription="This is a detailed description for project 3"
                links={[
                  {
                    href: "https://github.com/deveduar/nextjs-blog",
                    label: "GitHub",
                    svg: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z" />
                    </svg>
                    )
                  },
                  {
                    href: "https://nextjs-blog-xi-indol.vercel.app/",
                    label: "Demo",
                    svg: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 15.889v-2.223s-3.78-.114-7 3.333c1.513-6.587 7-7.778 7-7.778v-2.221l5 4.425-5 4.464z" />
                      </svg>
                    )
                  }
                ]}  
              />
            </div>
          </div>

      </div>

      {/* <FooterB /> */}
      <Footer />

    </section>
  );
};

export default Home;
