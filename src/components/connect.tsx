import Link from "next/link";


export default function Connect() {
  return (
        <div className=" flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-6 lg:px-20 rounded-xl w-full">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Why Choose Me?</h3>
          <p className="text-lg max-w-5xl mb-8 text-left text-black dark:text-white ">
            I&apos;m a versatile developer who can handle a wide range of challenges, from architecting complex systems to ensuring smooth user experiences. I take pride in writing code that is both functional and elegant, ensuring that the end product is not only effective but also easy to maintain.
          </p>
          <p className="text-lg max-w-5xl mb-8 text-left text-black dark:text-white ">
            Beyond my technical abilities, I&apos;m a lifelong learner who thrives in a fast-paced, ever-changing environment. I&apos;m passionate about continuous improvement, both as a developer and as a team member. I am driven to contribute to meaningful projects that make a positive impact.
          </p>
          <div className="flex justify-center mt-6">
            <Link href="/contactView" className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-600 transition-all duration-300 dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-500">
              Let’s Connect
            </Link>
          </div>
        </div>
  )
}
