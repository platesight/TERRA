"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import MobileNav from "./MobileNav";

export default function Header() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    const pathname = usePathname();

    // Close mobile nav on route change
    useEffect(() => {
        setIsMobileNavOpen(false);
    }, [pathname]);

    // Header scroll effect
    useEffect(() => {
        let lastScroll = 0;
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll > 50 && currentScroll > lastScroll) {
                gsap.to(headerRef.current, { y: -100, duration: 0.3, ease: "power2.out" });
            } else {
                gsap.to(headerRef.current, { y: 0, duration: 0.3, ease: "power2.out" });
                if (currentScroll > 50) {
                    headerRef.current?.classList.add("bg-terra-charcoal/90", "backdrop-blur-md");
                } else {
                    headerRef.current?.classList.remove("bg-terra-charcoal/90", "backdrop-blur-md");
                }
            }
            lastScroll = currentScroll;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                ref={headerRef}
                className="fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 transition-colors duration-300"
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Brand */}
                    <Link href="/" className="group z-50 relative">
                        <h1 className="text-3xl md:text-4xl font-serif tracking-widest text-white group-hover:text-terra-gold transition-colors">
                            TERRA
                        </h1>
                        <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-400 group-hover:text-white transition-colors">
                            Plates & Pour
                        </p>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-12">
                        <Link href="/" className="uppercase text-xs tracking-[0.2em] hover:text-terra-gold transition-colors">
                            Home
                        </Link>
                        <Link href="/menu" className="uppercase text-xs tracking-[0.2em] hover:text-terra-gold transition-colors">
                            Menu
                        </Link>
                        <Link href="/about" className="uppercase text-xs tracking-[0.2em] hover:text-terra-gold transition-colors">
                            About
                        </Link>
                    </nav>

                    {/* Mobile Burger */}
                    <button
                        className="md:hidden z-50 text-white"
                        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                    >
                        {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
        </>
    );
}
