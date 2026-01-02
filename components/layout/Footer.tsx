import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black py-12 md:py-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-serif text-white tracking-widest">TERRA</h2>
                    <p className="text-xs uppercase tracking-[0.2em] text-terra-gold mt-1">Plates & Pour</p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-4 text-sm text-gray-400">
                    <div className="flex gap-6 uppercase tracking-widest text-xs">
                        <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
                        <Link href="#" className="hover:text-white transition-colors">WhatsApp</Link>
                    </div>
                    <p className="text-xs opacity-50">&copy; {new Date().getFullYear()} TERRA. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
