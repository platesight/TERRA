"use client";

import Image from "next/image";

const CARDS = [
    {
        title: "Plates",
        subtitle: "Curated Flavors",
        image: "/assets/about/terraphoto6.png", // Using pngs from about
    },
    {
        title: "Pour",
        subtitle: "Crafted Spirits",
        image: "/assets/about/terraphoto5.png",
    },
    {
        title: "Mood",
        subtitle: "The Red Circle",
        image: "/assets/about/terraphoto7.png",
    },
];

export default function ThreePillCards() {

    return (
        <section className="relative w-full py-24 bg-terra-charcoal z-10">
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <h2 className="text-3xl font-serif text-white mb-2">The Experience</h2>
                <div className="h-[2px] w-12 bg-terra-gold/50" />
            </div>

            {/* Horizontal Scroll Container */}
            <div
                className="flex w-full overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 md:px-12 gap-4 md:gap-8 pb-12"
            >
                {CARDS.map((card, idx) => (
                    <div
                        key={idx}
                        className="relative flex-none w-[85vw] md:w-[40vw] lg:w-[30vw] h-[113vw] md:h-[50vw] lg:h-[40vw] snap-center group overflow-hidden cursor-pointer"
                    >
                        <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            priority
                            sizes="(max-width: 768px) 85vw, (max-width: 1200px) 40vw, 30vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110 z-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 z-10" />

                        <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-20">
                            <h3 className="text-4xl font-serif text-white mb-2">{card.title}</h3>
                            <p className="text-sm uppercase tracking-widest text-terra-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                {card.subtitle}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
