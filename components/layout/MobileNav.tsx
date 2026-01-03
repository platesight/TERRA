"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            gsap.to(containerRef.current, {
                y: "0%",
                duration: 0.5,
                ease: "power3.inOut",
            });
            document.body.style.overflow = "hidden";
        } else {
            gsap.to(containerRef.current, {
                y: "100%",
                duration: 0.5,
                ease: "power3.inOut",
            });
            document.body.style.overflow = "";
        }

        // Cleanup to ensure scrolling is restored if component unmounts
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Handle closing when clicking links
    const handleLinkClick = () => {
        onClose();
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 bg-terra-charcoal z-40 flex flex-col justify-center items-center translate-y-full transform will-change-transform"
        >
            <nav ref={linksRef} className="flex flex-col items-center space-y-8">
                <Link
                    href="/"
                    onClick={handleLinkClick}
                    className="text-3xl font-serif text-white hover:text-terra-gold transition-colors"
                >
                    Home
                </Link>
                <Link
                    href="/menu"
                    onClick={handleLinkClick}
                    className="text-3xl font-serif text-white hover:text-terra-gold transition-colors"
                >
                    Menu
                </Link>
                <Link
                    href="/about"
                    onClick={handleLinkClick}
                    className="text-3xl font-serif text-white hover:text-terra-gold transition-colors"
                >
                    About
                </Link>


            </nav>

            <div className="absolute bottom-12 text-center text-white/40 text-xs tracking-widest uppercase">
                <p>Ch. Sambhaji nagar</p>
            </div>
        </div>
    );
}
