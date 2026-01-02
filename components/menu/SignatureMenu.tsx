"use client";

import { useState } from "react";
import MenuCard from "./MenuCard";
import ARModal from "./ARModal";

const MENU_ITEMS = [
    {
        id: "pasta",
        name: "Truffle Tagliatelle",
        desc: "Hand-cut pasta, truffle cream, aged parmesan.",
        image: "/assets/menu/pasta.png",
        model: "/assets/models/pasta.glb",
    },
    {
        id: "sushi",
        name: "Omakase Boat",
        desc: "Chef's selection of premium nigiri and sashimi.",
        image: "/assets/menu/sushi_boat_nigiri.png",
        model: "/assets/models/sushi_boat_nigiri.glb",
    },
    {
        id: "curry",
        name: "Raisukaree",
        desc: "Mild coconut citrus curry, prawns, mangetout.",
        image: "/assets/menu/wagamama_chicken_raisukaree.png",
        model: "/assets/models/wagamama_chicken_raisukaree_ar.glb",
    },
];

export default function SignatureMenu() {
    const [selectedModel, setSelectedModel] = useState<{ src: string; poster: string; name: string } | null>(null);

    return (
        <section className="py-24 max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Signature Selections</h1>
                <p className="text-terra-gold text-xs uppercase tracking-[0.3em]">Taste • Visual • Experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MENU_ITEMS.map((item) => (
                    <MenuCard
                        key={item.id}
                        name={item.name}
                        desc={item.desc}
                        image={item.image}
                        onView3D={() => setSelectedModel({ src: item.model, poster: item.image, name: item.name })}
                        onViewAR={() => setSelectedModel({ src: item.model, poster: item.image, name: item.name })}
                    />
                ))}
            </div>

            <ARModal
                isOpen={!!selectedModel}
                onClose={() => setSelectedModel(null)}
                modelSrc={selectedModel?.src || ""}
                posterSrc={selectedModel?.poster || ""}
                dishName={selectedModel?.name || ""}
            />
        </section>
    );
}
