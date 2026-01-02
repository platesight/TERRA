import Image from "next/image";
import Hero from "@/components/home/Hero";
import ThreePillCards from "@/components/home/ThreePillCards";
import EventsTease from "@/components/home/EventsTease";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroller from "@/components/layout/SmoothScroller";

export default function Home() {
  return (
    <SmoothScroller>
      <Header />
      <main className="flex-grow bg-terra-charcoal">
        <Hero />
        <ThreePillCards />
        <EventsTease />
      </main>
      <Footer />
    </SmoothScroller>
  );
}
