export default function EventsTease() {
    const events = [
        { name: "The Red Circle", desc: "Curated Cocktails", date: "Every Friday" },
        { name: "Sundowner", desc: "House & Techno", date: "Saturday 5PM" },
        { name: "Sip & Bake", desc: "Pastry & Wine Pairing", date: "Sunday Brunch" },
    ];

    return (
        <section className="bg-terra-dark py-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <h2 className="text-3xl font-serif text-white">Upcoming Nights</h2>
                    <p className="text-terra-gold text-xs tracking-widest uppercase mt-4 md:mt-0">Instagram @terra.aurangabad</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {events.map((event, idx) => (
                        <div
                            key={idx}
                            className="group border border-white/10 p-8 hover:border-terra-gold/50 transition-colors duration-500 bg-terra-charcoal"
                        >
                            <div className="text-xs text-grays-500 uppercase tracking-widest mb-4 group-hover:text-terra-gold transition-colors">
                                {event.date}
                            </div>
                            <h3 className="text-3xl font-serif text-white mb-2 leading-none">
                                {event.name}
                            </h3>
                            <p className="text-sm text-gray-400 font-light">
                                {event.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
