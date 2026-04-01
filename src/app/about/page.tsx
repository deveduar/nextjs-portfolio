import About from "@/components/about";
import Connect from "@/components/connect";
import ProjectBreadcrumb from "@/components/projectBreadcrumb";

export default function AboutView() {

  return (
      <div className="flex flex-col">
        <ProjectBreadcrumb />
        <section id="about" className="bg-gray-100 dark:bg-gray-950 -mx-2 px-2 md:-mx-12 md:px-12 lg:-mx-50 lg:px-50 xl:-mx-60 xl:px-60 py-4">
          <About />
        </section>
        <section id="connect" className="bg-gray-100 dark:bg-gray-950 -mx-2 px-2 md:-mx-12 md:px-12 lg:-mx-50 lg:px-50 xl:-mx-60 xl:px-60 py-4">
          <Connect />
        </section>
      </div>
    );
}
