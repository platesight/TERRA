import SignatureMenu from "@/components/menu/SignatureMenu";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroller from "@/components/layout/SmoothScroller";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Menu | TERRA — Plates & Pour',
    description: 'Signature selections and curated pours. Experience interaction.',
};

export default function MenuPage() {
    return (
        <SmoothScroller>
            <Header />
            <main className="flex-grow bg-terra-charcoal pt-24 min-h-screen">
                <SignatureMenu />
            </main>
            <Footer />
        </SmoothScroller>
    );
}
