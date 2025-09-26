import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Services & Pricing | Custom Woodworking by SathTheBuilder",
    description: "Explore our custom woodworking services including furniture, built-ins, and restoration. Get pricing information for your next project.",
};

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-wood-50 via-white to-craft-50">
            <div className="container mx-auto px-6 py-16 space-y-24">
                {/* Header */}
                <div className="text-center space-y-6">
                    <h1 className="font-display text-5xl md:text-6xl font-bold text-craft-900 tracking-tight">
                        Services & Pricing
                    </h1>
                    <p className="text-craft-600 text-xl max-w-3xl mx-auto leading-relaxed">
                        Custom Woodworking Tailored to Your Vision
                    </p>
                    <Link href="/" className="inline-flex items-center text-wood-600 hover:text-wood-700 font-medium">
                        ← Back home
                    </Link>
                </div>

                {/* Introduction */}
                <section className="card bg-gradient-to-r from-craft-800 to-craft-900 text-white shadow-wood p-10">
                    <h2 className="font-display text-4xl font-bold text-wood-100 mb-8">
                        Custom Woodworking Services
                    </h2>
                    <p className="text-craft-100 text-xl leading-relaxed mb-10">
                        Every piece I create is custom-designed for your specific needs and space. Pricing varies based on
                        design complexity, materials, size, and finish requirements. Below are starting price ranges to
                        help you plan your project.
                    </p>
                    <div className="bg-wood-500/20 rounded-xl p-8 border border-wood-400/30">
                        <p className="text-wood-100 font-medium text-lg">
                            <strong className="text-wood-200">Free Consultation:</strong> All projects begin with a complimentary consultation
                            to discuss your vision and provide an accurate quote.
                        </p>
                    </div>
                </section>

                {/* Service Categories */}
                <section className="space-y-16">
                    {/* Custom Furniture */}
                    <div className="card bg-white shadow-wood p-10">
                        <div className="flex items-center gap-8 mb-12">
                            <div className="w-24 h-24 rounded-xl bg-wood-100 flex items-center justify-center">
                                <span className="text-5xl">🪑</span>
                            </div>
                            <div>
                                <h3 className="font-display text-4xl font-semibold text-craft-900">Custom Furniture</h3>
                                <p className="text-craft-600 text-xl">Dining tables, coffee tables, chairs, beds, and more</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-craft-50 border-2 border-wood-200 rounded-xl p-8 hover:shadow-wood transition-all duration-300">
                                <h4 className="font-display text-xl font-semibold text-craft-900 mb-4">Dining Tables</h4>
                                <p className="text-craft-600 mb-6 leading-relaxed text-lg">
                                    4-8 person farmhouse, live edge, or traditional styles
                                </p>
                                <p className="text-3xl font-bold text-wood-600">$1,200 - $3,500</p>
                                <p className="text-sm text-craft-500 mt-3">Starting prices vary by size and wood species</p>
                            </div>

                            <div className="bg-craft-50 border-2 border-wood-200 rounded-xl p-8 hover:shadow-wood transition-all duration-300">
                                <h4 className="font-display text-xl font-semibold text-craft-900 mb-4">Coffee Tables</h4>
                                <p className="text-craft-600 mb-6 leading-relaxed text-lg">
                                    Live edge, modern, or traditional designs
                                </p>
                                <p className="text-3xl font-bold text-wood-600">$600 - $1,800</p>
                                <p className="text-sm text-craft-500 mt-3">Including storage options and unique features</p>
                            </div>

                            <div className="bg-craft-50 border-2 border-wood-200 rounded-xl p-8 hover:shadow-wood transition-all duration-300">
                                <h4 className="font-display text-xl font-semibold text-craft-900 mb-4">Bed Frames</h4>
                                <p className="text-craft-600 mb-6 leading-relaxed text-lg">
                                    Platform beds, headboards, and bedroom furniture
                                </p>
                                <p className="text-3xl font-bold text-wood-600">$800 - $2,500</p>
                                <p className="text-sm text-craft-500 mt-3">Queen to King sizes with custom features</p>
                            </div>

                            <div className="bg-craft-50 border-2 border-wood-200 rounded-xl p-8 hover:shadow-wood transition-all duration-300">
                                <h4 className="font-display text-xl font-semibold text-craft-900 mb-4">Chairs & Seating</h4>
                                <p className="text-craft-600 mb-6 leading-relaxed text-lg">
                                    Dining chairs, benches, bar stools
                                </p>
                                <p className="text-3xl font-bold text-wood-600">$200 - $600</p>
                                <p className="text-sm text-craft-500 mt-3">Per piece, set discounts available</p>
                            </div>

                            <div className="bg-craft-50 border-2 border-wood-200 rounded-xl p-8 hover:shadow-wood transition-all duration-300">
                                <h4 className="font-display text-xl font-semibold text-craft-900 mb-4">Desks & Workstations</h4>
                                <p className="text-craft-600 mb-6 leading-relaxed text-lg">
                                    Home office, standing desks, computer tables
                                </p>
                                <p className="text-3xl font-bold text-wood-600">$700 - $2,200</p>
                                <p className="text-sm text-craft-500 mt-3">Cable management and storage options</p>
                            </div>

                            <div className="bg-craft-50 border-2 border-wood-200 rounded-xl p-8 hover:shadow-wood transition-all duration-300">
                                <h4 className="font-display text-xl font-semibold text-craft-900 mb-4">Storage Solutions</h4>
                                <p className="text-craft-600 mb-6 leading-relaxed text-lg">
                                    Bookcases, dressers, storage benches
                                </p>
                                <p className="text-3xl font-bold text-wood-600">$500 - $1,800</p>
                                <p className="text-sm text-craft-500 mt-3">Custom sizing and configuration</p>
                            </div>
                        </div>
                    </div>

                    {/* Built-in Cabinetry */}
                    <div className="card bg-white shadow-wood p-10">
                        <div className="flex items-center gap-8 mb-12">
                            <div className="w-24 h-24 rounded-xl bg-wood-100 flex items-center justify-center">
                                <span className="text-5xl">🏠</span>
                            </div>
                            <div>
                                <h3 className="font-display text-4xl font-semibold text-craft-900">Built-in Cabinetry</h3>
                                <p className="text-craft-600 text-xl">Custom storage solutions that maximize your space</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-craft-50 border-2 border-wood-200 rounded-xl p-8 hover:shadow-wood transition-all duration-300">
                                <h4 className="font-display text-xl font-semibold text-craft-900 mb-4">Kitchen Islands</h4>
                                <p className="text-craft-600 mb-6 leading-relaxed text-lg">
                                    Custom islands with storage, seating, and butcher block tops
                                </p>
                                <p className="text-3xl font-bold text-wood-600">$2,000 - $5,500</p>
                                <p className="text-sm text-craft-500 mt-3">Includes electrical and plumbing accommodations</p>
                            </div>

                            <div className="bg-craft-50 border-2 border-wood-200 rounded-xl p-8 hover:shadow-wood transition-all duration-300">
                                <h4 className="font-display text-xl font-semibold text-craft-900 mb-4">Built-in Bookcases</h4>
                                <p className="text-craft-600 mb-6 leading-relaxed text-lg">
                                    Floor-to-ceiling storage with adjustable shelving
                                </p>
                                <p className="text-3xl font-bold text-wood-600">$150 - $300</p>
                                <p className="text-sm text-craft-500 mt-3">Per linear foot, crown molding included</p>
                            </div>

                            <div className="bg-craft-50 border-2 border-wood-200 rounded-xl p-8 hover:shadow-wood transition-all duration-300">
                                <h4 className="font-display text-xl font-semibold text-craft-900 mb-4">Entertainment Centers</h4>
                                <p className="text-craft-600 mb-6 leading-relaxed text-lg">
                                    Media storage with cable management and display areas
                                </p>
                                <p className="text-3xl font-bold text-wood-600">$1,500 - $4,000</p>
                                <p className="text-sm text-craft-500 mt-3">Custom sizing for your TV and components</p>
                            </div>

                            <div className="bg-craft-50 border-2 border-wood-200 rounded-xl p-8 hover:shadow-wood transition-all duration-300">
                                <h4 className="font-display text-xl font-semibold text-craft-900 mb-4">Closet Systems</h4>
                                <p className="text-craft-600 mb-6 leading-relaxed text-lg">
                                    Organized storage with hanging rods, shelves, and drawers
                                </p>
                                <p className="text-3xl font-bold text-wood-600">$1,200 - $3,500</p>
                                <p className="text-sm text-craft-500 mt-3">Walk-in and reach-in closet solutions</p>
                            </div>
                        </div>
                    </div>

                    {/* Specialty Services */}
                    <div className="card bg-white shadow-wood p-10">
                        <div className="flex items-center gap-8 mb-12">
                            <div className="w-24 h-24 rounded-xl bg-wood-100 flex items-center justify-center">
                                <span className="text-5xl">🔧</span>
                            </div>
                            <div>
                                <h3 className="font-display text-4xl font-semibold text-craft-900">Specialty Services</h3>
                                <p className="text-craft-600 text-xl">Restoration, repairs, and unique projects</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-craft-50 border-2 border-wood-200 rounded-xl p-8 hover:shadow-wood transition-all duration-300">
                                <h4 className="font-display text-xl font-semibold text-craft-900 mb-4">Furniture Restoration</h4>
                                <p className="text-craft-600 mb-6 leading-relaxed text-lg">
                                    Bring new life to antique and damaged furniture pieces
                                </p>
                                <p className="text-3xl font-bold text-wood-600">$75 - $150/hour</p>
                                <p className="text-sm text-craft-500 mt-3">Free assessment and estimate</p>
                            </div>

                            <div className="bg-craft-50 border-2 border-wood-200 rounded-xl p-8 hover:shadow-wood transition-all duration-300">
                                <h4 className="font-display text-xl font-semibold text-craft-900 mb-4">Custom Millwork</h4>
                                <p className="text-craft-600 mb-6 leading-relaxed text-lg">
                                    Trim, molding, mantels, and architectural details
                                </p>
                                <p className="text-3xl font-bold text-wood-600">$50 - $200</p>
                                <p className="text-sm text-craft-500 mt-3">Per linear foot depending on complexity</p>
                            </div>

                            <div className="bg-craft-50 border-2 border-wood-200 rounded-xl p-8 hover:shadow-wood transition-all duration-300">
                                <h4 className="font-display text-xl font-semibold text-craft-900 mb-4">Wood Slab Preparation</h4>
                                <p className="text-craft-600 mb-6 leading-relaxed text-lg">
                                    Live edge processing, flattening, and finishing
                                </p>
                                <p className="text-3xl font-bold text-wood-600">$25 - $75/sq ft</p>
                                <p className="text-sm text-craft-500 mt-3">Based on thickness and species</p>
                            </div>

                            <div className="bg-craft-50 border-2 border-wood-200 rounded-xl p-8 hover:shadow-wood transition-all duration-300">
                                <h4 className="font-display text-xl font-semibold text-craft-900 mb-4">Small Projects</h4>
                                <p className="text-craft-600 mb-6 leading-relaxed text-lg">
                                    Cutting boards, shelves, picture frames, gifts
                                </p>
                                <p className="text-3xl font-bold text-wood-600">$50 - $300</p>
                                <p className="text-sm text-craft-500 mt-3">Perfect for trying our craftsmanship</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Project Timeline */}
                <section className="card bg-gradient-to-br from-wood-50 to-wood-100 shadow-wood p-12">
                    <h2 className="font-display text-4xl font-bold text-craft-900 mb-16 text-center">Typical Project Timeline</h2>
                    <div className="grid md:grid-cols-4 gap-10">
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-wood-300 to-wood-400 flex items-center justify-center mx-auto mb-8 shadow-craft">
                                <span className="text-white font-bold text-xl">1-2</span>
                            </div>
                            <h4 className="font-display text-xl font-semibold text-craft-900 mb-4">Weeks</h4>
                            <p className="text-craft-600 leading-relaxed text-lg">Small items, repairs, cutting boards</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-wood-400 to-wood-500 flex items-center justify-center mx-auto mb-8 shadow-craft">
                                <span className="text-white font-bold text-xl">2-4</span>
                            </div>
                            <h4 className="font-display text-xl font-semibold text-craft-900 mb-4">Weeks</h4>
                            <p className="text-craft-600 leading-relaxed text-lg">Coffee tables, chairs, smaller furniture</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-wood-500 to-wood-600 flex items-center justify-center mx-auto mb-8 shadow-craft">
                                <span className="text-white font-bold text-xl">4-8</span>
                            </div>
                            <h4 className="font-display text-xl font-semibold text-craft-900 mb-4">Weeks</h4>
                            <p className="text-craft-600 leading-relaxed text-lg">Dining tables, built-ins, bedroom sets</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-wood-600 to-wood-700 flex items-center justify-center mx-auto mb-8 shadow-craft">
                                <span className="text-white font-bold text-xl">8+</span>
                            </div>
                            <h4 className="font-display text-xl font-semibold text-craft-900 mb-4">Weeks</h4>
                            <p className="text-craft-600 leading-relaxed text-lg">Kitchen islands, complex built-ins</p>
                        </div>
                    </div>
                    <p className="text-sm text-slatey-600 dark:text-slatey-300 text-center mt-6">
                        Timelines vary based on complexity, current workload, and material availability. Rush orders available for additional fee.
                    </p>
                </section>

                {/* Payment & Policies */}
                <section className="grid md:grid-cols-2 gap-10">
                    <div className="card bg-white shadow-wood p-8">
                        <h3 className="font-display text-2xl font-semibold text-craft-900 mb-6">Payment Terms</h3>
                        <ul className="space-y-4 text-craft-700">
                            <li className="flex items-start gap-4">
                                <span className="text-wood-500 mt-1 text-lg">→</span>
                                <span className="text-lg"><strong>50% deposit</strong> to secure project and begin work</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-wood-500 mt-1 text-lg">→</span>
                                <span className="text-lg"><strong>25% progress payment</strong> when construction begins</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-wood-500 mt-1 text-lg">→</span>
                                <span className="text-lg"><strong>25% final payment</strong> upon completion and delivery</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-wood-500 mt-1 text-lg">→</span>
                                <span className="text-lg">Cash, check, or bank transfer accepted</span>
                            </li>
                        </ul>
                    </div>

                    <div className="card card-hover bg-white shadow-wood p-8">
                        <h3 className="font-display text-2xl font-semibold text-craft-900 mb-6">What&apos;s Included</h3>
                        <ul className="space-y-4 text-craft-700">
                            <li className="flex items-start gap-4">
                                <span className="text-wood-500 mt-1 text-lg">✓</span>
                                <span className="leading-relaxed text-lg">Design consultation and sketches</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-wood-500 mt-1 text-lg">✓</span>
                                <span className="leading-relaxed text-lg">All materials and hardware</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-wood-500 mt-1 text-lg">✓</span>
                                <span className="leading-relaxed text-lg">Professional finishing and protection</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-wood-500 mt-1 text-lg">✓</span>
                                <span className="leading-relaxed text-lg">Delivery within 30 miles</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="text-wood-500 mt-1 text-lg">✓</span>
                                <span className="leading-relaxed text-lg">Care instructions and 1-year warranty</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center card bg-gradient-to-br from-craft-50 to-wood-50 shadow-craft border-2 border-wood-200 p-12">
                    <h2 className="font-display text-4xl font-bold text-craft-900 mb-8">Ready to Discuss Your Project?</h2>
                    <p className="text-craft-600 text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
                        Every project starts with understanding your vision. Let&apos;s schedule a free consultation to discuss
                        your needs and provide an accurate quote.
                    </p>
                    <div className="flex flex-wrap justify-center gap-8">
                        <Link
                            href="/contact"
                            className="btn-primary"
                        >
                            Request Free Quote
                        </Link>
                        <Link
                            href="/gallery"
                            className="btn-secondary"
                        >
                            Browse My Work
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}