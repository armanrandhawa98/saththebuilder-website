import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About SathTheBuilder | Custom Woodworking Craftsman",
    description: "Learn about our passion for woodworking, craftsmanship philosophy, and commitment to creating heirloom-quality custom furniture and built-ins.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-wood-50 via-white to-craft-50">
            <div className="container mx-auto px-6 py-16 space-y-24">
                {/* Header */}
                <div className="text-center space-y-6 py-8">
                    <h1 className="font-display text-5xl md:text-6xl font-bold text-craft-900 tracking-tight">
                        About SathTheBuilder
                    </h1>
                    <p className="text-craft-600 text-xl max-w-2xl mx-auto leading-relaxed">
                        Crafting Heirloom Quality Since Day One
                    </p>
                    <div className="pt-4">
                        <Link href="/" className="inline-flex items-center text-wood-600 hover:text-wood-700 font-medium">
                            ← Back home
                        </Link>
                    </div>
                </div>

                {/* Hero Section */}
                <section className="card card-hover bg-gradient-to-r from-craft-800 to-craft-900 text-white shadow-wood p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <h2 className="font-display text-3xl font-bold text-wood-100">
                                Master Craftsman
                            </h2>
                            <p className="text-craft-100 leading-relaxed text-lg">
                                Welcome to my workshop! I&apos;m passionate about creating custom woodworking pieces that blend
                                traditional craftsmanship with modern functionality. Every project tells a story, and I&apos;m
                                here to help you tell yours through beautiful, handcrafted wood furniture and built-ins.
                            </p>
                            <p className="text-craft-200 leading-relaxed">
                                What started as a hobby in my garage has grown into a full-time passion for creating
                                pieces that will be treasured for generations. I believe in quality over quantity,
                                taking the time to ensure every joint is perfect and every finish is flawless.
                            </p>
                        </div>
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-craft">
                            <Image
                                src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600"
                                alt="Craftsman working in woodworking shop"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </section>

                {/* Philosophy Section */}
                <section className="grid md:grid-cols-3 gap-10">
                    <div className="card card-hover bg-white shadow-wood p-8">
                        <div className="w-20 h-20 rounded-xl bg-wood-100 flex items-center justify-center mb-8">
                            <span className="text-4xl">🔨</span>
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-craft-900 mb-6">Traditional Craftsmanship</h3>
                        <p className="text-craft-600 leading-relaxed text-lg">
                            Using time-tested joinery techniques like mortise and tenon, dovetails, and hand-cut joints
                            that ensure your pieces will last for generations.
                        </p>
                    </div>

                    <div className="card card-hover bg-white shadow-wood p-8">
                        <div className="w-20 h-20 rounded-xl bg-wood-100 flex items-center justify-center mb-8">
                            <span className="text-4xl">🌳</span>
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-craft-900 mb-6">Premium Materials</h3>
                        <p className="text-craft-600 leading-relaxed text-lg">
                            I source the finest hardwoods - walnut, cherry, oak, maple - from sustainable suppliers.
                            Each piece of wood is carefully selected for grain and character.
                        </p>
                    </div>

                    <div className="card card-hover bg-white shadow-wood p-8">
                        <div className="w-20 h-20 rounded-xl bg-wood-100 flex items-center justify-center mb-8">
                            <span className="text-4xl">✨</span>
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-craft-900 mb-6">Custom Design</h3>
                        <p className="text-craft-600 leading-relaxed text-lg">
                            Every piece is designed specifically for your space and needs. From initial concept to
                            final delivery, we work together to create something truly unique.
                        </p>
                    </div>
                </section>

                {/* Process Section */}
                <section className="card bg-gradient-to-br from-wood-50 to-wood-100 shadow-wood p-12">
                    <h2 className="font-display text-4xl font-bold text-craft-900 mb-16 text-center">My Process</h2>
                    <div className="grid md:grid-cols-4 gap-12">
                        <div className="text-center">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-wood-500 to-wood-600 text-white flex items-center justify-center mx-auto mb-8 text-3xl font-bold shadow-craft">
                                1
                            </div>
                            <h3 className="font-display text-xl font-semibold text-craft-900 mb-4">Consultation</h3>
                            <p className="text-craft-600 leading-relaxed text-lg">
                                We discuss your vision, space, and functional needs
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-wood-500 to-wood-600 text-white flex items-center justify-center mx-auto mb-8 text-3xl font-bold shadow-craft">
                                2
                            </div>
                            <h3 className="font-display text-xl font-semibold text-craft-900 mb-4">Design & Quote</h3>
                            <p className="text-craft-600 leading-relaxed text-lg">
                                Custom design sketches and detailed project proposal
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-wood-500 to-wood-600 text-white flex items-center justify-center mx-auto mb-8 text-3xl font-bold shadow-craft">
                                3
                            </div>
                            <h3 className="font-display text-xl font-semibold text-craft-900 mb-4">Crafting</h3>
                            <p className="text-craft-600 leading-relaxed text-lg">
                                Careful construction using traditional and modern techniques
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-wood-500 to-wood-600 text-white flex items-center justify-center mx-auto mb-8 text-3xl font-bold shadow-craft">
                                4
                            </div>
                            <h3 className="font-display text-xl font-semibold text-craft-900 mb-4">Delivery</h3>
                            <p className="text-craft-600 leading-relaxed text-lg">
                                Professional installation and care instructions
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="grid md:grid-cols-2 gap-12">
                    <div className="card card-hover bg-white shadow-wood p-10">
                        <h3 className="font-display text-3xl font-semibold text-craft-900 mb-8">Why Choose Custom?</h3>
                        <ul className="space-y-6 text-craft-700">
                            <li className="flex items-start gap-3">
                                <span className="text-wood-500 mt-1 text-lg">✓</span>
                                <span className="leading-relaxed">Perfect fit for your space and lifestyle</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-wood-500 mt-1 text-lg">✓</span>
                                <span className="leading-relaxed">Choice of wood species and finish</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-wood-500 mt-1 text-lg">✓</span>
                                <span className="leading-relaxed">Built to last with premium materials</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-wood-500 mt-1 text-lg">✓</span>
                                <span className="leading-relaxed">Unique piece that reflects your style</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-wood-500 mt-1 text-lg">✓</span>
                                <span className="leading-relaxed">Supporting local craftsmanship</span>
                            </li>
                        </ul>
                    </div>

                    <div className="card card-hover bg-white shadow-wood p-10">
                        <h3 className="font-display text-3xl font-semibold text-craft-900 mb-8">My Commitment</h3>
                        <div className="space-y-6 text-craft-700">
                            <p className="leading-relaxed text-lg">
                                <strong className="text-craft-900 font-semibold">Quality:</strong> Every piece is built to heirloom standards with attention to every detail.
                            </p>
                            <p className="leading-relaxed text-lg">
                                <strong className="text-craft-900 font-semibold">Communication:</strong> Regular updates throughout the project so you&apos;re always informed.
                            </p>
                            <p className="leading-relaxed text-lg">
                                <strong className="text-craft-900 font-semibold">Warranty:</strong> 1-year craftsmanship warranty on all joinery and finishes.
                            </p>
                            <p className="leading-relaxed text-lg">
                                <strong className="text-craft-900 font-semibold">Satisfaction:</strong> Your happiness with the final piece is my top priority.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center card bg-gradient-to-br from-craft-50 to-wood-50 shadow-craft border-2 border-wood-200 p-12">
                    <h2 className="font-display text-4xl font-bold text-craft-900 mb-8">Ready to Start Your Project?</h2>
                    <p className="text-craft-600 text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
                        Let&apos;s discuss your vision and create something beautiful together. Every great piece starts with a conversation.
                    </p>
                    <div className="flex flex-wrap justify-center gap-8">
                        <Link
                            href="/contact"
                            className="btn-primary"
                        >
                            Get a Quote
                        </Link>
                        <Link
                            href="/gallery"
                            className="btn-secondary"
                        >
                            View My Work
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}