import Link from "next/link";

export default function Connect() {
  return (
    <div className="flex gap-2">
      <Link href="/contact" className="flex-1 px-4 py-2 bg-blue-200 text-gray-900 rounded-lg font-medium hover:bg-blue-300 transition-all duration-300 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800 text-sm text-center">
        Let&apos;s Connect
      </Link>
      <Link
        href="/projects"
        className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 text-sm text-center"
      >
        View My Work
      </Link>
    </div>
  );
}
