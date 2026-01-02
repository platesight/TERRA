import AboutGallery from "@/components/about/AboutGallery";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroller from "@/components/layout/SmoothScroller";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About | TERRA — Plates & Pour',
    description: 'Aurangabad’s curated evening. Light, sound, and conversation.',
};

export default function AboutPage() {
    return (
        <SmoothScroller>
            <Header />
            <main className="flex-grow bg-terra-charcoal pt-32 pb-24 min-h-screen">

                {/* Mission / Hook */}
                <section className="max-w-4xl mx-auto px-6 text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-serif text-white mb-8">TERRA</h1>
                    <div className="h-[1px] w-24 bg-terra-gold mx-auto mb-12" />

                    <div className="space-y-6 text-lg md:text-xl font-light text-gray-300 leading-relaxed">
                        <p>
                            Terra is Aurangabad’s curated evening—where light, sound and conversation meet.
                        </p>
                        <p>
                            Not just a meal, but a staged night: slow pours, crafted plates, and rooms designed for lingering.
                        </p>
                        <p className="text-white">
                            Come for the music. Stay for the moments.
                        </p>
                    </div>
                </section>

                {/* Gallery */}
                <AboutGallery />

                {/* Location & Details */}
                <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.668748722668!2d75.333!3d19.876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDUyJzM2LjAiTiA3NcKwMjAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1630000000000!5m2!1sen!2sin"
                            width="100%"
                            height="400"
                            style={{ border: 0, opacity: 0.7, filter: "grayscale(100%) invert(90%)" }}
                            allowFullScreen
                            loading="lazy"
                            className="rounded-lg"
                        ></iframe>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-serif text-white mb-2">Find Us</h3>
                            <p className="text-gray-400">XYZ Street, Connaught Place</p>
                            <p className="text-gray-400">Aurangabad, Maharashtra 431001</p>
                            <a href="https://maps.google.com" target="_blank" className="text-terra-gold uppercase text-xs tracking-widest mt-2 inline-block hover:underline">Get Directions</a>
                        </div>
                        <div>
                            <h3 className="text-xl font-serif text-white mb-2">Hours</h3>
                            <p className="text-gray-400">Wed – Sun: 7 PM – 2 AM</p>
                            <p className="text-gray-400">Closed Mon & Tue</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-serif text-white mb-2">Contact</h3>
                            <p className="text-gray-400">+91 72491 77477</p>
                            <p className="text-xs text-terra-gold mt-1">Accepting reservations via WhatsApp</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </SmoothScroller>
    );
}
