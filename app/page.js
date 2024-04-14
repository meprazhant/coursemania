import Image from "next/image";
import Landing from "./components/(notauth)/Landing";
import Process from "./components/(notauth)/Process";
import Courses from "./components/(notauth)/Courses";
import Categories from "./components/(notauth)/Categories";
import Footer from "./components/(notauth)/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Landing />
      <Process />
      <Courses />
      <Categories />
      <Footer />
    </main>
  );
}
