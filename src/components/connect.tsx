import Link from "next/link";


export default function Connect() {
  return (
        <div className=" flex flex-col items-center justify-center  p-6 lg:px-20 rounded-xl w-full">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Why Choose Me?</h3>
          <p className="text-lg max-w-5xl mb-8 text-left text-black dark:text-white ">
            I&apos;m a versatile developer who can handle a wide range of challenges, from architecting complex systems to ensuring smooth user experiences. I take pride in writing code that is both functional and elegant, ensuring that the end product is not only effective but also easy to maintain.
          </p>
          <p className="text-lg max-w-5xl mb-8 text-left text-black dark:text-white ">
            Beyond my technical abilities, I&apos;m a lifelong learner who thrives in a fast-paced, ever-changing environment. I&apos;m passionate about continuous improvement, both as a developer and as a team member. I am driven to contribute to meaningful projects that make a positive impact.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Link href="/contactView" className="px-6 py-3 bg-blue-200 text-gray-900 rounded-lg font-semibold hover:bg-blue-300 transition-all duration-300 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800">
              Let&apos;s Connect
            </Link>
            <Link
              href="/projectsView"
              className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              View My Work
            </Link>
          </div>
        </div>
  )
}
