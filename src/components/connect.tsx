import Link from "next/link";

export default function Connect() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-300">Why Choose Me?</h3>
      <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
        I&apos;m a versatile developer who can handle a wide range of challenges, from architecting complex systems to ensuring smooth user experiences. I take pride in writing code that is both functional and elegant, ensuring that the end product is not only effective but also easy to maintain.
      </p>
      <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
        Beyond my technical abilities, I&apos;m a lifelong learner who thrives in a fast-paced, ever-changing environment. I&apos;m passionate about continuous improvement, both as a developer and as a team member. I am driven to contribute to meaningful projects that make a positive impact.
      </p>
      <div className="flex gap-4 pt-2">
        <Link href="/contactView" className="px-4 py-2 bg-blue-200 text-gray-900 rounded-lg font-medium hover:bg-blue-300 transition-all duration-300 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800 text-sm">
          Let&apos;s Connect
        </Link>
        <Link
          href="/projects"
          className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 text-sm"
        >
          View My Work
        </Link>
      </div>
    </div>
  );
}