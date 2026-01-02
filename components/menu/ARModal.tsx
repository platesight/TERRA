"use client";

import { useEffect, useRef, useState } from "react";
import { X, Loader2, Smartphone, AlertCircle } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import { useDeviceCapabilities } from "@/lib/useDeviceCapabilities";

interface ARModalProps {
    isOpen: boolean;
    onClose: () => void;
    modelSrc: string;
    posterSrc: string;
    dishName: string;
}

export default function ARModal({ isOpen, onClose, modelSrc, posterSrc, dishName }: ARModalProps) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [modelViewerLoaded, setModelViewerLoaded] = useState(false);
    const modelViewerRef = useRef<any>(null);
    const { supportsAR } = useDeviceCapabilities();

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            setError(false);
        }
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    // Attach event listeners to model-viewer element
    useEffect(() => {
        if (!isOpen || !modelViewerRef.current || !modelViewerLoaded) return;

        const modelViewer = modelViewerRef.current;

        const handleLoad = () => {
            setLoading(false);
            setError(false);
        };

        const handleError = (event: Event) => {
            console.error('❌ Model failed to load:', modelSrc, event);
            setLoading(false);
            setError(true);
        };

        // Add event listeners
        modelViewer.addEventListener('load', handleLoad);
        modelViewer.addEventListener('error', handleError);

        return () => {
            modelViewer.removeEventListener('load', handleLoad);
            modelViewer.removeEventListener('error', handleError);
        };
    }, [isOpen, modelSrc, modelViewerLoaded]);

    if (!isOpen) return null;

    return (
        <>
            {/* Load model-viewer script only if modal is open */}
            {isOpen && (
                <Script
                    src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"
                    type="module"
                    onLoad={() => setModelViewerLoaded(true)}
                />
            )}

            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-white hover:text-terra-gold transition-colors z-50 p-2"
                    aria-label="Close"
                >
                    <X size={32} />
                </button>

                <div className="relative w-full h-full max-w-5xl max-h-[85vh] bg-terra-dark rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                    {/* Loading State */}
                    {loading && !error && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-terra-charcoal z-10">
                            <Loader2 className="animate-spin text-terra-gold mb-4" size={48} />
                            <p className="text-white/60 tracking-widest text-xs uppercase">Loading 3D Model...</p>
                        </div>
                    )}

                    {/* Error State - Fallback to High-Res Image */}
                    {error && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-terra-charcoal z-10 p-8">
                            <AlertCircle className="text-terra-gold mb-4" size={48} />
                            <p className="text-white/80 tracking-widest text-sm uppercase mb-6">3D Model Unavailable</p>
                            <div className="relative w-full max-w-md aspect-square mb-6">
                                <Image
                                    src={posterSrc}
                                    alt={dishName}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-white/50 text-xs text-center max-w-md">
                                Showing high-resolution image. The 3D model could not be loaded.
                            </p>
                            <p className="text-white/30 text-xs mt-2">Path: {modelSrc}</p>
                        </div>
                    )}

                    {/* Model Viewer */}
                    {!error && modelViewerLoaded && (
                        <model-viewer
                            ref={modelViewerRef}
                            src={modelSrc}
                            ios-src={modelSrc.replace(".glb", ".usdz")}
                            poster={posterSrc}
                            alt={`3D model of ${dishName}`}
                            shadow-intensity="0.8"
                            exposure="1"
                            camera-controls
                            auto-rotate
                            ar={supportsAR ? true : undefined}
                            ar-modes={supportsAR ? "webxr scene-viewer quick-look" : undefined}
                            camera-orbit="45deg 55deg 2.5m"
                            field-of-view="30deg"
                            interaction-prompt="auto"
                            loading="eager"
                            class="w-full h-full"
                            style={{ width: "100%", height: "100%", backgroundColor: "#1a1a1a" }}
                        >
                            {/* AR Button - Only show on supported devices */}
                            {supportsAR && (
                                <button slot="ar-button" className="absolute bottom-8 right-8 bg-terra-gold text-terra-charcoal px-6 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors flex items-center gap-2 shadow-lg">
                                    <Smartphone size={16} />
                                    View in AR
                                </button>
                            )}

                            {/* AR Not Supported Warning - Desktop */}
                            {!supportsAR && (
                                <div className="absolute bottom-8 right-8 flex items-start gap-2 p-4 bg-red-900/20 border border-red-500/30 rounded-sm max-w-xs">
                                    <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-red-300 leading-relaxed">
                                        AR view is available only on supported mobile devices (Android & iOS).
                                    </p>
                                </div>
                            )}
                        </model-viewer>
                    )}

                    {/* Info Overlay */}
                    {!error && (
                        <div className="absolute bottom-8 left-8 pointer-events-none">
                            <h3 className="text-2xl font-serif text-white">{dishName}</h3>
                            <p className="text-white/50 text-xs mt-1">Drag to rotate • Pinch to zoom</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
