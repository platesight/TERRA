'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import Link from "next/link";
import { useEffect, useRef, memo } from "react";
import gsap from "gsap";

function SplineSceneBasic() {
    const textRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text reveal with stagger
            if (textRef.current?.children) {
                gsap.fromTo(
                    Array.from(textRef.current.children),
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        stagger: 0.3,
                        ease: "power3.out",
                        delay: 0.3,
                    }
                );
            }

            // Button appears after text
            if (buttonRef.current) {
                gsap.fromTo(
                    buttonRef.current,
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        delay: 1.2,
                    }
                );
            }
        });

        // Cleanup GSAP animations on unmount
        return () => ctx.revert();
    }, []);

    return (
        <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden flex items-center justify-center border-none rounded-none">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />

            <div className="flex flex-col md:flex-row h-full w-full max-w-7xl mx-auto">
                {/* Left content - Restaurant focused */}
                <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center text-left">
                    <div ref={textRef} className="space-y-6">
                        {/* Eyebrow */}
                        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-terra-gold/80">
                            Plates & Pour
                        </p>

                        {/* Main Heading */}
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-wider">
                            TERRA
                        </h2>

                        {/* Experience Tagline */}
                        <p className="text-lg md:text-xl text-gray-300 font-light max-w-md leading-relaxed">
                            Where evenings turn into experiences.
                        </p>
                    </div>

                    {/* View Menu CTA */}
                    <Link
                        ref={buttonRef}
                        href="/menu"
                        className="group relative mt-10 px-10 py-4 overflow-hidden border border-white/20 rounded-none transition-all hover:border-terra-gold inline-flex items-center justify-center w-fit"
                    >
                        <span className="relative z-10 text-sm uppercase tracking-[0.25em] text-white group-hover:text-terra-charcoal transition-colors duration-500">
                            View Menu
                        </span>
                        <div className="absolute inset-0 bg-terra-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                    </Link>
                </div>

                {/* Right content - Robot Sculpture */}
                <div className="flex-1 relative h-full min-h-[300px]">
                    <SplineScene
                        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                        className="w-full h-full"
                    />
                </div>
            </div>
        </Card>
    )
}

// Memoize to prevent unnecessary re-renders
export default memo(SplineSceneBasic);
