"use client";

import Image from "next/image";
import { Eye, Smartphone, AlertCircle } from "lucide-react";
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

    return (
        <div className="group relative bg-terra-dark border border-white/10 overflow-hidden transition-all hover:border-terra-gold">
            {/* Image */}
            <div className="relative h-64 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
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

                    {/* View in AR - Conditional */}
                    <button
                        onClick={supportsAR ? onViewAR : undefined}
                        disabled={!supportsAR}
                        className={`flex items-center justify-center gap-2 px-6 py-3 border uppercase text-xs tracking-widest transition-all ${supportsAR
                                ? "border-terra-gold text-terra-gold hover:bg-terra-gold hover:text-terra-charcoal cursor-pointer"
                                : "border-white/10 text-white/30 cursor-not-allowed opacity-50"
                            }`}
                    >
                        <Smartphone size={16} />
                        View in AR
                    </button>

                    {/* AR Warning - Only show when AR is not supported */}
                    {!supportsAR && (
                        <div className="flex items-start gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-sm">
                            <AlertCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-red-300 leading-relaxed">
                                AR view is available only on supported mobile devices (Android & iOS).
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
