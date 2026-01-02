"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, Smartphone, AlertCircle, X } from "lucide-react";
import { useDeviceCapabilities } from "@/lib/useDeviceCapabilities";

interface MenuCardProps {
    name: string;
    desc: string;
    image: string;
    onView3D: () => void;
    onViewAR: () => void;
}

export default function MenuCard({ name, desc, image, onView3D, onViewAR }: MenuCardProps) {
    const { supportsAR } = useDeviceCapabilities();
    const [showARWarning, setShowARWarning] = useState(false);

    const handleARClick = () => {
        if (supportsAR) {
            onViewAR();
        } else {
            setShowARWarning(true);
            // Auto-hide after 5 seconds
            setTimeout(() => setShowARWarning(false), 5000);
        }
    };

    return (
        <div className="group relative bg-terra-dark border border-white/10 overflow-hidden transition-all hover:border-terra-gold">
            {/* Image */}
            <div className="relative h-64 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-terra-charcoal via-transparent to-transparent opacity-60" />
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <div>
                    <h3 className="text-2xl font-serif text-white mb-2">{name}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    {/* View in 3D - Always Available */}
                    <button
                        onClick={onView3D}
                        className="flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white hover:border-terra-gold hover:bg-terra-gold/10 transition-all uppercase text-xs tracking-widest"
                    >
                        <Eye size={16} />
                        View in 3D
                    </button>

                    {/* View in AR - Always clickable, shows warning on desktop */}
                    <button
                        onClick={handleARClick}
                        suppressHydrationWarning
                        className={`flex items-center justify-center gap-2 px-6 py-3 border uppercase text-xs tracking-widest transition-all ${supportsAR
                            ? "border-terra-gold text-terra-gold hover:bg-terra-gold hover:text-terra-charcoal cursor-pointer"
                            : "border-white/20 text-white hover:border-terra-gold hover:bg-terra-gold/10 cursor-pointer"
                            }`}
                    >
                        <Smartphone size={16} />
                        View in AR
                    </button>

                    {/* AR Warning - Only show when AR button is clicked on desktop */}
                    {showARWarning && (
                        <div className="flex items-start gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-sm relative">
                            <AlertCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-red-300 leading-relaxed">
                                AR view is available only on supported mobile devices (Android & iOS).
                            </p>
                            <button
                                onClick={() => setShowARWarning(false)}
                                className="absolute top-2 right-2 text-red-400 hover:text-red-300"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
