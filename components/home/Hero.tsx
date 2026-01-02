"use client";

import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { SplineScene } from "@/components/ui/splite";

function Hero() {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

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
            {/* Pure Black Background with Spotlight */}
            <div className="absolute inset-0 w-full h-full bg-black">
                {/* Subtle spotlight from top-left */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_0%,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
                {/* Subtle gold ambient glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)]" />
            </div>

            {/* Robot Sculpture - Visible on Desktop & Mobile now */}
            <div className="absolute inset-0 lg:left-auto lg:right-0 lg:w-1/2 pointer-events-none z-0 mix-blend-lighten opacity-80 lg:opacity-100">
                <div
                    className="w-full h-full flex items-center justify-center transform scale-110 lg:scale-150 translate-y-12 lg:translate-y-0"
                    style={{
                        willChange: 'transform'
                    }}
                >
                    <SplineScene
                        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                        className="w-full h-full"
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
                        Ch. Sambhaji nagar's curated evening—where light, sound and conversation meet.
                    </p>

                    {/* CTA - visible on all devices now */}
                    <a href="/menu" className="block group relative px-8 py-3 overflow-hidden border border-white/30 rounded-none transition-all hover:border-terra-gold">
                        <span className="relative z-10 text-xs uppercase tracking-[0.2em] group-hover:text-terra-charcoal transition-colors duration-500">
                            View Menu
                        </span>
                        <div className="absolute inset-0 bg-terra-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                    </a>
                </div>
            </div>
        </section>
    );
}

// Memoize to prevent unnecessary re-renders
export default memo(Hero);
