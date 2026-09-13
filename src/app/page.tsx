import { Navigation } from "@/components/navigation";
import { BackgroundFx } from "@/components/background-fx";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { Capabilities } from "@/components/capabilities";
import { EngineeringPrinciples } from "@/components/engineering-principles";
import { About } from "@/components/about";
import { BlogPreview } from "@/components/blog-preview";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col">
      <BackgroundFx />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <SelectedWork />
        <Capabilities />
        <EngineeringPrinciples />
        <About />
        <BlogPreview />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
