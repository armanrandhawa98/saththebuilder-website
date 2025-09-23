import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Services & Pricing | Custom Woodworking by SathTheBuilder",
    description: "Explore our custom woodworking services including furniture, built-ins, and restoration. Get pricing information for your next project.",
};

export default function ServicesPage() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-wood-600 dark:text-wood-300">Services & Pricing</h1>
                <Link href="/" className="text-sm underline hover:no-underline">← Back home</Link>
            </div>

            {/* Introduction */}
            <section className="rounded-2xl p-8 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                <h2 className="text-2xl font-semibold text-wood-600 dark:text-wood-300 mb-4">
                    Custom Woodworking Services
                </h2>
                <p className="text-slatey-700 dark:text-slatey-200 leading-relaxed mb-6">
                    Every piece I create is custom-designed for your specific needs and space. Pricing varies based on
                    design complexity, materials, size, and finish requirements. Below are starting price ranges to
                    help you plan your project.
                </p>
                <div className="bg-wood-50 dark:bg-wood-900/10 rounded-xl p-4 border border-wood-200 dark:border-wood-800">
                    <p className="text-sm text-wood-700 dark:text-wood-300">
                        <strong>Free Consultation:</strong> All projects begin with a complimentary consultation
                        to discuss your vision and provide an accurate quote.
                    </p>
                </div>
            </section>

            {/* Service Categories */}
            <section className="space-y-8">
                {/* Custom Furniture */}
                <div className="rounded-2xl p-8 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-wood-100 dark:bg-wood-900/20 flex items-center justify-center">
                            <span className="text-3xl">🪑</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-wood-600 dark:text-wood-300">Custom Furniture</h3>
                            <p className="text-slatey-600 dark:text-slatey-300">Dining tables, coffee tables, chairs, beds, and more</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="border border-slatey-200 dark:border-slatey-700 rounded-xl p-4">
                            <h4 className="font-semibold mb-2">Dining Tables</h4>
                            <p className="text-sm text-slatey-600 dark:text-slatey-300 mb-3">
                                4-8 person farmhouse, live edge, or traditional styles
                            </p>
                            <p className="text-lg font-bold text-wood-600 dark:text-wood-300">$1,200 - $3,500</p>
                            <p className="text-xs text-slatey-500 mt-1">Starting prices vary by size and wood species</p>
                        </div>

                        <div className="border border-slatey-200 dark:border-slatey-700 rounded-xl p-4">
                            <h4 className="font-semibold mb-2">Coffee Tables</h4>
                            <p className="text-sm text-slatey-600 dark:text-slatey-300 mb-3">
                                Live edge, modern, or traditional designs
                            </p>
                            <p className="text-lg font-bold text-wood-600 dark:text-wood-300">$600 - $1,800</p>
                            <p className="text-xs text-slatey-500 mt-1">Including storage options and unique features</p>
                        </div>

                        <div className="border border-slatey-200 dark:border-slatey-700 rounded-xl p-4">
                            <h4 className="font-semibold mb-2">Bed Frames</h4>
                            <p className="text-sm text-slatey-600 dark:text-slatey-300 mb-3">
                                Platform beds, headboards, and bedroom furniture
                            </p>
                            <p className="text-lg font-bold text-wood-600 dark:text-wood-300">$800 - $2,500</p>
                            <p className="text-xs text-slatey-500 mt-1">Queen to King sizes with custom features</p>
                        </div>

                        <div className="border border-slatey-200 dark:border-slatey-700 rounded-xl p-4">
                            <h4 className="font-semibold mb-2">Chairs & Seating</h4>
                            <p className="text-sm text-slatey-600 dark:text-slatey-300 mb-3">
                                Dining chairs, benches, bar stools
                            </p>
                            <p className="text-lg font-bold text-wood-600 dark:text-wood-300">$200 - $600</p>
                            <p className="text-xs text-slatey-500 mt-1">Per piece, set discounts available</p>
                        </div>

                        <div className="border border-slatey-200 dark:border-slatey-700 rounded-xl p-4">
                            <h4 className="font-semibold mb-2">Desks & Workstations</h4>
                            <p className="text-sm text-slatey-600 dark:text-slatey-300 mb-3">
                                Home office, standing desks, computer tables
                            </p>
                            <p className="text-lg font-bold text-wood-600 dark:text-wood-300">$700 - $2,200</p>
                            <p className="text-xs text-slatey-500 mt-1">Cable management and storage options</p>
                        </div>

                        <div className="border border-slatey-200 dark:border-slatey-700 rounded-xl p-4">
                            <h4 className="font-semibold mb-2">Storage Solutions</h4>
                            <p className="text-sm text-slatey-600 dark:text-slatey-300 mb-3">
                                Bookcases, dressers, storage benches
                            </p>
                            <p className="text-lg font-bold text-wood-600 dark:text-wood-300">$500 - $1,800</p>
                            <p className="text-xs text-slatey-500 mt-1">Custom sizing and configuration</p>
                        </div>
                    </div>
                </div>

                {/* Built-in Cabinetry */}
                <div className="rounded-2xl p-8 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-wood-100 dark:bg-wood-900/20 flex items-center justify-center">
                            <span className="text-3xl">🏠</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-wood-600 dark:text-wood-300">Built-in Cabinetry</h3>
                            <p className="text-slatey-600 dark:text-slatey-300">Custom storage solutions that maximize your space</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border border-slatey-200 dark:border-slatey-700 rounded-xl p-4">
                            <h4 className="font-semibold mb-2">Kitchen Islands</h4>
                            <p className="text-sm text-slatey-600 dark:text-slatey-300 mb-3">
                                Custom islands with storage, seating, and butcher block tops
                            </p>
                            <p className="text-lg font-bold text-wood-600 dark:text-wood-300">$2,000 - $5,500</p>
                            <p className="text-xs text-slatey-500 mt-1">Includes electrical and plumbing accommodations</p>
                        </div>

                        <div className="border border-slatey-200 dark:border-slatey-700 rounded-xl p-4">
                            <h4 className="font-semibold mb-2">Built-in Bookcases</h4>
                            <p className="text-sm text-slatey-600 dark:text-slatey-300 mb-3">
                                Floor-to-ceiling storage with adjustable shelving
                            </p>
                            <p className="text-lg font-bold text-wood-600 dark:text-wood-300">$150 - $300</p>
                            <p className="text-xs text-slatey-500 mt-1">Per linear foot, crown molding included</p>
                        </div>

                        <div className="border border-slatey-200 dark:border-slatey-700 rounded-xl p-4">
                            <h4 className="font-semibold mb-2">Entertainment Centers</h4>
                            <p className="text-sm text-slatey-600 dark:text-slatey-300 mb-3">
                                Media storage with cable management and display areas
                            </p>
                            <p className="text-lg font-bold text-wood-600 dark:text-wood-300">$1,500 - $4,000</p>
                            <p className="text-xs text-slatey-500 mt-1">Custom sizing for your TV and components</p>
                        </div>

                        <div className="border border-slatey-200 dark:border-slatey-700 rounded-xl p-4">
                            <h4 className="font-semibold mb-2">Closet Systems</h4>
                            <p className="text-sm text-slatey-600 dark:text-slatey-300 mb-3">
                                Organized storage with hanging rods, shelves, and drawers
                            </p>
                            <p className="text-lg font-bold text-wood-600 dark:text-wood-300">$1,200 - $3,500</p>
                            <p className="text-xs text-slatey-500 mt-1">Walk-in and reach-in closet solutions</p>
                        </div>
                    </div>
                </div>

                {/* Specialty Services */}
                <div className="rounded-2xl p-8 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-wood-100 dark:bg-wood-900/20 flex items-center justify-center">
                            <span className="text-3xl">🔧</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-wood-600 dark:text-wood-300">Specialty Services</h3>
                            <p className="text-slatey-600 dark:text-slatey-300">Restoration, repairs, and unique projects</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border border-slatey-200 dark:border-slatey-700 rounded-xl p-4">
                            <h4 className="font-semibold mb-2">Furniture Restoration</h4>
                            <p className="text-sm text-slatey-600 dark:text-slatey-300 mb-3">
                                Bring new life to antique and damaged furniture pieces
                            </p>
                            <p className="text-lg font-bold text-wood-600 dark:text-wood-300">$75 - $150/hour</p>
                            <p className="text-xs text-slatey-500 mt-1">Free assessment and estimate</p>
                        </div>

                        <div className="border border-slatey-200 dark:border-slatey-700 rounded-xl p-4">
                            <h4 className="font-semibold mb-2">Custom Millwork</h4>
                            <p className="text-sm text-slatey-600 dark:text-slatey-300 mb-3">
                                Trim, molding, mantels, and architectural details
                            </p>
                            <p className="text-lg font-bold text-wood-600 dark:text-wood-300">$50 - $200</p>
                            <p className="text-xs text-slatey-500 mt-1">Per linear foot depending on complexity</p>
                        </div>

                        <div className="border border-slatey-200 dark:border-slatey-700 rounded-xl p-4">
                            <h4 className="font-semibold mb-2">Wood Slab Preparation</h4>
                            <p className="text-sm text-slatey-600 dark:text-slatey-300 mb-3">
                                Live edge processing, flattening, and finishing
                            </p>
                            <p className="text-lg font-bold text-wood-600 dark:text-wood-300">$25 - $75/sq ft</p>
                            <p className="text-xs text-slatey-500 mt-1">Based on thickness and species</p>
                        </div>

                        <div className="border border-slatey-200 dark:border-slatey-700 rounded-xl p-4">
                            <h4 className="font-semibold mb-2">Small Projects</h4>
                            <p className="text-sm text-slatey-600 dark:text-slatey-300 mb-3">
                                Cutting boards, shelves, picture frames, gifts
                            </p>
                            <p className="text-lg font-bold text-wood-600 dark:text-wood-300">$50 - $300</p>
                            <p className="text-xs text-slatey-500 mt-1">Perfect for trying our craftsmanship</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Timeline */}
            <section className="rounded-2xl p-8 bg-wood-50 dark:bg-wood-900/10 border border-wood-200 dark:border-wood-800">
                <h2 className="text-2xl font-semibold text-wood-600 dark:text-wood-300 mb-6">Typical Project Timeline</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-wood-200 dark:bg-wood-800 flex items-center justify-center mx-auto mb-3">
                            <span className="text-wood-600 dark:text-wood-300 font-bold">1-2</span>
                        </div>
                        <h4 className="font-medium mb-2">Weeks</h4>
                        <p className="text-sm text-slatey-600 dark:text-slatey-300">Small items, repairs, cutting boards</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-wood-300 dark:bg-wood-700 flex items-center justify-center mx-auto mb-3">
                            <span className="text-wood-700 dark:text-wood-200 font-bold">2-4</span>
                        </div>
                        <h4 className="font-medium mb-2">Weeks</h4>
                        <p className="text-sm text-slatey-600 dark:text-slatey-300">Coffee tables, chairs, smaller furniture</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-wood-400 dark:bg-wood-600 flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-bold">4-8</span>
                        </div>
                        <h4 className="font-medium mb-2">Weeks</h4>
                        <p className="text-sm text-slatey-600 dark:text-slatey-300">Dining tables, built-ins, bedroom sets</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-wood-500 text-white flex items-center justify-center mx-auto mb-3">
                            <span className="font-bold">8+</span>
                        </div>
                        <h4 className="font-medium mb-2">Weeks</h4>
                        <p className="text-sm text-slatey-600 dark:text-slatey-300">Kitchen islands, complex built-ins</p>
                    </div>
                </div>
                <p className="text-sm text-slatey-600 dark:text-slatey-300 text-center mt-6">
                    Timelines vary based on complexity, current workload, and material availability. Rush orders available for additional fee.
                </p>
            </section>

            {/* Payment & Policies */}
            <section className="grid md:grid-cols-2 gap-8">
                <div className="rounded-2xl p-6 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                    <h3 className="text-xl font-semibold text-wood-600 dark:text-wood-300 mb-4">Payment Terms</h3>
                    <ul className="space-y-3 text-slatey-700 dark:text-slatey-200">
                        <li className="flex items-start gap-3">
                            <span className="text-wood-500 mt-1">→</span>
                            <span><strong>50% deposit</strong> to secure project and begin work</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-wood-500 mt-1">→</span>
                            <span><strong>25% progress payment</strong> when construction begins</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-wood-500 mt-1">→</span>
                            <span><strong>25% final payment</strong> upon completion and delivery</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-wood-500 mt-1">→</span>
                            <span>Cash, check, or bank transfer accepted</span>
                        </li>
                    </ul>
                </div>

                <div className="rounded-2xl p-6 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                    <h3 className="text-xl font-semibold text-wood-600 dark:text-wood-300 mb-4">What&apos;s Included</h3>
                    <ul className="space-y-3 text-slatey-700 dark:text-slatey-200">
                        <li className="flex items-start gap-3">
                            <span className="text-wood-500 mt-1">✓</span>
                            <span>Design consultation and sketches</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-wood-500 mt-1">✓</span>
                            <span>All materials and hardware</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-wood-500 mt-1">✓</span>
                            <span>Professional finishing and protection</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-wood-500 mt-1">✓</span>
                            <span>Delivery within 30 miles</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-wood-500 mt-1">✓</span>
                            <span>Care instructions and 1-year warranty</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* CTA Section */}
            <section className="text-center rounded-2xl p-8 bg-wood-50 dark:bg-wood-900/10 border border-wood-200 dark:border-wood-800">
                <h2 className="text-2xl font-semibold text-wood-600 dark:text-wood-300 mb-4">Ready to Discuss Your Project?</h2>
                <p className="text-slatey-700 dark:text-slatey-200 mb-6 max-w-2xl mx-auto">
                    Every project starts with understanding your vision. Let&apos;s schedule a free consultation to discuss
                    your needs and provide an accurate quote.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/contact"
                        className="px-6 py-3 rounded-xl bg-wood-500 text-white hover:bg-wood-600 font-medium transition"
                    >
                        Request Free Quote
                    </Link>
                    <Link
                        href="/gallery"
                        className="px-6 py-3 rounded-xl border border-wood-300 dark:border-wood-600 hover:bg-wood-50 dark:hover:bg-wood-900/20 font-medium transition"
                    >
                        Browse My Work
                    </Link>
                </div>
            </section>
        </div>
    );
}