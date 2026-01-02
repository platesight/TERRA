"use client";

import { useEffect, useRef, memo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SplineScene } from "@/components/ui/splite";

function Hero() {
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // One-time Ken Burns Effect (no infinite loop)
            gsap.fromTo(
                imageRef.current,
                { scale: 1.02 },
                {
                    scale: 1.0,
                    duration: 12,
                    ease: "power1.inOut",
                }
            );

            // Text Reveal with stagger
            if (textRef.current?.children) {
                gsap.fromTo(
                    Array.from(textRef.current.children),
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.5,
                        stagger: 0.4,
                        ease: "power3.out",
                        delay: 0.5,
                    }
                );
            }
        });

        // Cleanup GSAP animations on unmount
        return () => ctx.revert();
    }, []);

    return (
        <section
            className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
            style={{ paddingTop: 'var(--header-height)' }}
        >
            {/* Background Image with Ken Burns */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    ref={imageRef}
                    src="/assets/about/terraphoto1.jpeg"
                    alt="Terra Atmosphere"
                    fill
                    priority
                    className="object-cover opacity-50"
                    quality={85}
                />
                {/* Club lighting gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-terra-charcoal/40 via-transparent to-terra-charcoal" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(212,175,55,0.08)_50%,transparent_100%)]" />
                {/* Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            </div>

            {/* Robot Sculpture - Right Third */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block opacity-40 pointer-events-none">
                <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                        filter: 'sepia(40%) contrast(85%) saturate(60%) brightness(70%)',
                        mixBlendMode: 'luminosity',
                        willChange: 'auto'
                    }}
                >
                    <SplineScene
                        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                        className="w-full h-full scale-150"
                    />
                </div>
            </div>

            {/* Hero Content - Left Aligned on Desktop, Centered on Mobile */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
                <div
                    ref={textRef}
                    className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl"
                >
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white tracking-widest mb-4">
                        TERRA
                    </h1>
                    <div className="h-[1px] w-24 bg-terra-gold mb-6" />
                    <p className="text-sm md:text-base uppercase tracking-[0.4em] text-gray-200 mb-4">
                        Plates & Pour
                    </p>
                    <p className="text-sm md:text-base text-gray-300 font-light mb-12 max-w-md">
                        Aurangabad's curated evening—where light, sound and conversation meet.
                    </p>

                    {/* CTA - Hidden on mobile (sticky CTA handles mobile) */}
                    <button className="hidden md:block group relative px-8 py-3 overflow-hidden border border-white/30 rounded-none transition-all hover:border-terra-gold">
                        <span className="relative z-10 text-xs uppercase tracking-[0.2em] group-hover:text-terra-charcoal transition-colors duration-500">
                            Reserve Table
                        </span>
                        <div className="absolute inset-0 bg-terra-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                    </button>
                </div>
            </div>
        </section>
    );
}

// Memoize to prevent unnecessary re-renders
export default memo(Hero);
