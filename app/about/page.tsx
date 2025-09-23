import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About SathTheBuilder | Custom Woodworking Craftsman",
    description: "Learn about our passion for woodworking, craftsmanship philosophy, and commitment to creating heirloom-quality custom furniture and built-ins.",
};

export default function AboutPage() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-wood-600 dark:text-wood-300">About SathTheBuilder</h1>
                <Link href="/" className="text-sm underline hover:no-underline">← Back home</Link>
            </div>

            {/* Hero Section */}
            <section className="rounded-2xl p-8 sm:p-10 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-wood-600 dark:text-wood-300">
                            Crafting Heirloom Quality Since Day One
                        </h2>
                        <p className="text-slatey-700 dark:text-slatey-200 leading-relaxed">
                            Welcome to my workshop! I&apos;m passionate about creating custom woodworking pieces that blend
                            traditional craftsmanship with modern functionality. Every project tells a story, and I&apos;m
                            here to help you tell yours through beautiful, handcrafted wood furniture and built-ins.
                        </p>
                        <p className="text-slatey-700 dark:text-slatey-200 leading-relaxed">
                            What started as a hobby in my garage has grown into a full-time passion for creating
                            pieces that will be treasured for generations. I believe in quality over quantity,
                            taking the time to ensure every joint is perfect and every finish is flawless.
                        </p>
                    </div>
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
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
            <section className="grid md:grid-cols-3 gap-6">
                <div className="rounded-2xl p-6 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                    <div className="w-12 h-12 rounded-xl bg-wood-100 dark:bg-wood-900/20 flex items-center justify-center mb-4">
                        <span className="text-2xl">🔨</span>
                    </div>
                    <h3 className="text-lg font-semibold text-wood-600 dark:text-wood-300 mb-3">Traditional Craftsmanship</h3>
                    <p className="text-slatey-600 dark:text-slatey-300 text-sm">
                        Using time-tested joinery techniques like mortise and tenon, dovetails, and hand-cut joints
                        that ensure your pieces will last for generations.
                    </p>
                </div>

                <div className="rounded-2xl p-6 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                    <div className="w-12 h-12 rounded-xl bg-wood-100 dark:bg-wood-900/20 flex items-center justify-center mb-4">
                        <span className="text-2xl">🌳</span>
                    </div>
                    <h3 className="text-lg font-semibold text-wood-600 dark:text-wood-300 mb-3">Premium Materials</h3>
                    <p className="text-slatey-600 dark:text-slatey-300 text-sm">
                        I source the finest hardwoods - walnut, cherry, oak, maple - from sustainable suppliers.
                        Each piece of wood is carefully selected for grain and character.
                    </p>
                </div>

                <div className="rounded-2xl p-6 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                    <div className="w-12 h-12 rounded-xl bg-wood-100 dark:bg-wood-900/20 flex items-center justify-center mb-4">
                        <span className="text-2xl">✨</span>
                    </div>
                    <h3 className="text-lg font-semibold text-wood-600 dark:text-wood-300 mb-3">Custom Design</h3>
                    <p className="text-slatey-600 dark:text-slatey-300 text-sm">
                        Every piece is designed specifically for your space and needs. From initial concept to
                        final delivery, we work together to create something truly unique.
                    </p>
                </div>
            </section>

            {/* Process Section */}
            <section className="rounded-2xl p-8 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                <h2 className="text-2xl font-semibold text-wood-600 dark:text-wood-300 mb-6">My Process</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-wood-500 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                            1
                        </div>
                        <h3 className="font-medium mb-2">Consultation</h3>
                        <p className="text-sm text-slatey-600 dark:text-slatey-300">
                            We discuss your vision, space, and functional needs
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-wood-500 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                            2
                        </div>
                        <h3 className="font-medium mb-2">Design & Quote</h3>
                        <p className="text-sm text-slatey-600 dark:text-slatey-300">
                            Custom design sketches and detailed project proposal
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-wood-500 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                            3
                        </div>
                        <h3 className="font-medium mb-2">Crafting</h3>
                        <p className="text-sm text-slatey-600 dark:text-slatey-300">
                            Careful construction using traditional and modern techniques
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-wood-500 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                            4
                        </div>
                        <h3 className="font-medium mb-2">Delivery</h3>
                        <p className="text-sm text-slatey-600 dark:text-slatey-300">
                            Professional installation and care instructions
                        </p>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="grid md:grid-cols-2 gap-8">
                <div className="rounded-2xl p-6 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                    <h3 className="text-xl font-semibold text-wood-600 dark:text-wood-300 mb-4">Why Choose Custom?</h3>
                    <ul className="space-y-3 text-slatey-700 dark:text-slatey-200">
                        <li className="flex items-start gap-3">
                            <span className="text-wood-500 mt-1">✓</span>
                            <span>Perfect fit for your space and lifestyle</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-wood-500 mt-1">✓</span>
                            <span>Choice of wood species and finish</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-wood-500 mt-1">✓</span>
                            <span>Built to last with premium materials</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-wood-500 mt-1">✓</span>
                            <span>Unique piece that reflects your style</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-wood-500 mt-1">✓</span>
                            <span>Supporting local craftsmanship</span>
                        </li>
                    </ul>
                </div>

                <div className="rounded-2xl p-6 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                    <h3 className="text-xl font-semibold text-wood-600 dark:text-wood-300 mb-4">My Commitment</h3>
                    <div className="space-y-4 text-slatey-700 dark:text-slatey-200">
                        <p>
                            <strong className="text-wood-600 dark:text-wood-300">Quality:</strong> Every piece is built to heirloom standards with attention to every detail.
                        </p>
                        <p>
                            <strong className="text-wood-600 dark:text-wood-300">Communication:</strong> Regular updates throughout the project so you&apos;re always informed.
                        </p>
                        <p>
                            <strong className="text-wood-600 dark:text-wood-300">Warranty:</strong> 1-year craftsmanship warranty on all joinery and finishes.
                        </p>
                        <p>
                            <strong className="text-wood-600 dark:text-wood-300">Satisfaction:</strong> Your happiness with the final piece is my top priority.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="text-center rounded-2xl p-8 bg-wood-50 dark:bg-wood-900/10 border border-wood-200 dark:border-wood-800">
                <h2 className="text-2xl font-semibold text-wood-600 dark:text-wood-300 mb-4">Ready to Start Your Project?</h2>
                <p className="text-slatey-700 dark:text-slatey-200 mb-6 max-w-2xl mx-auto">
                    Let&apos;s discuss your vision and create something beautiful together. Every great piece starts with a conversation.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/contact"
                        className="px-6 py-3 rounded-xl bg-wood-500 text-white hover:bg-wood-600 font-medium transition"
                    >
                        Get a Quote
                    </Link>
                    <Link
                        href="/gallery"
                        className="px-6 py-3 rounded-xl border border-wood-300 dark:border-wood-600 hover:bg-wood-50 dark:hover:bg-wood-900/20 font-medium transition"
                    >
                        View My Work
                    </Link>
                </div>
            </section>
        </div>
    );
}