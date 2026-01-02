"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
    "/assets/about/terraphoto1.jpeg",
    "/assets/about/terraphoto2.jpeg",
    "/assets/about/terraphoto4.png",
    "/assets/about/terraphoto8.png",
];

export default function AboutGallery() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const images = gsap.utils.toArray<HTMLElement>('.gallery-image');
            images.forEach((img, i) => {
                gsap.fromTo(img,
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: img,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 my-24 px-6 md:px-12 max-w-7xl mx-auto">
            {IMAGES.map((src, idx) => (
                <div
                    key={idx}
                    className={`gallery-image relative overflow-hidden aspect-[4/5] ${idx % 2 === 1 ? 'md:translate-y-24' : ''}`}
                >
                    <Image
                        src={src}
                        alt={`Terra Experience ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                </div>
            ))}
        </div>
    );
}
