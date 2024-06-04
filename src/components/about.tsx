import React from "react";
import Image from "next/image";
import Link from "next/link";

const About: React.FC = () => {
  return (
    <>
      <section className="bg-secondary pt-20 pb-[120px]" data-aos="zoom-in">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] xl:gap-[134px]">
          <div className="mx-auto">
            <Image
              src="/assets/images/about/about2.png"
              alt="about me"
              width={500}
              height={500}
            />
          </div>
          <div className="font-bold font-Syne leading-none flex flex-wrap flex-col gap-y-2">
            <span className="text-orange text-xl">About me</span>
            <h3 className="text-black-800 text-4xl lg:text-5xl xl:text-[64px] tracking-[-1.5px]">
              Mark Henry
            </h3>
            <h4 className="text-black-800 text-2xl mt-3 mb-4">Product Designer</h4>
            <p className="text-xl font-bold font-Syne leading-7 mb-6">
              A Product Designer & Developer and I am in the game for over 7+ years. I am proud of my
              works and ready to face the next challenge
            </p>
            <p className="paragraph mb-6">
              That is where I come
              in.
              A lover of
              words, a wrangler of copy. Here to create copy that not
              only reflects who you are and what you stand for, but words that truly land with those that
              read them, calling your audience in and making them .
            </p>
            <div>
              <Image src="/assets/images/signature.svg" alt="signature" width={100} height={50} />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="overflow-x-hidden bg-white py-14 dark:bg-gray-dark">
                <div className="container">
                    <div className="items-center lg:flex">
                        <h2 className="flex-none border-gray/20 text-center text-xl font-black uppercase text-black dark:text-white lg:ltr:mr-12 lg:ltr:border-r-[3px] lg:ltr:pr-12 lg:ltr:text-left lg:rtl:ml-12 lg:rtl:border-l-[3px] lg:rtl:pl-12 lg:rtl:text-right">
                            PREVIOUSLY WORKED ON
                        </h2>
                    </div>
                </div>
            </section>
    </>
  );
};

export default About;
