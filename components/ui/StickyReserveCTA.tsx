"use client";

import { useState, useEffect } from "react";
import { Phone, CalendarCheck, X, MessageCircle } from "lucide-react";

export default function StickyReserveCTA() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    // Check if dismissed in session
    useEffect(() => {
        const dismissed = sessionStorage.getItem('reserveCTADismissed');
        if (dismissed === 'true') {
            setIsDismissed(true);
        }
    }, []);

    const handleDismiss = () => {
        setIsDismissed(true);
        sessionStorage.setItem('reserveCTADismissed', 'true');
    };

    // Mock form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsOpen(false);
        alert("Reservation Request Sent! (Demo)");
    };

    if (isDismissed) return null;

    if (isOpen) {
        return (
            <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in md:hidden">
                <div className="w-full max-w-md bg-terra-dark border border-white/10 p-8 rounded-xl shadow-2xl relative">
                    <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                        <X size={20} />
                    </button>

                    <h2 className="text-2xl font-serif text-white mb-6">Reserve a Table</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Name" required className="w-full bg-terra-charcoal border border-white/10 p-4 text-white focus:border-terra-gold outline-none rounded-none" />
                        <input type="tel" placeholder="Phone" required className="w-full bg-terra-charcoal border border-white/10 p-4 text-white focus:border-terra-gold outline-none rounded-none" />
                        <div className="grid grid-cols-2 gap-4">
                            <input type="date" required className="w-full bg-terra-charcoal border border-white/10 p-4 text-white focus:border-terra-gold outline-none rounded-none text-sm" />
                            <input type="time" required className="w-full bg-terra-charcoal border border-white/10 p-4 text-white focus:border-terra-gold outline-none rounded-none text-sm" />
                        </div>
                        <input type="number" placeholder="Guests" min="1" max="10" required className="w-full bg-terra-charcoal border border-white/10 p-4 text-white focus:border-terra-gold outline-none rounded-none" />

                        <button type="submit" className="w-full bg-terra-gold text-terra-charcoal font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors">
                            Confirm Request
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-white/10">
                        <p className="text-white/60 text-xs mb-4 text-center">Or contact us directly:</p>
                        <div className="flex gap-3">
                            <a
                                href="tel:+917249177477"
                                className="flex-1 flex items-center justify-center gap-2 bg-terra-charcoal border border-white/10 py-3 text-white hover:border-terra-gold transition-colors text-xs"
                            >
                                <Phone size={14} />
                                Call
                            </a>
                            <a
                                href="https://wa.me/917249177477"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-terra-charcoal border border-white/10 py-3 text-white hover:border-terra-gold transition-colors text-xs"
                            >
                                <MessageCircle size={14} />
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed bottom-6 left-0 right-0 px-6 md:hidden z-40 pointer-events-none">
            <div className="flex gap-3 pointer-events-auto">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex-1 bg-terra-gold text-terra-charcoal font-bold uppercase tracking-widest py-4 shadow-xl border border-white/10 flex items-center justify-center gap-3 rounded-full"
                >
                    <CalendarCheck size={18} />
                    Reserve Table
                </button>
                <button
                    onClick={handleDismiss}
                    className="bg-terra-charcoal/90 backdrop-blur-sm text-white/60 hover:text-white p-4 rounded-full border border-white/10"
                    aria-label="Dismiss"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );
}
