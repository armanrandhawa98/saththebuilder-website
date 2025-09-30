// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export default async function HomePage() {
  await connectDB();

  // Debug: Check what we have
  const allFeatured = await Project.find({ isPublished: true, isFeatured: true })
    .sort({ createdAt: -1 })
    .lean();
  
  console.log('🔍 FEATURED PROJECTS DEBUG:');
  console.log('Found featured projects:', allFeatured.length);
  console.log('Featured projects:', allFeatured.map(p => ({ 
    title: p.title, 
    createdAt: p.createdAt,
    isPublished: p.isPublished,
    isFeatured: p.isFeatured
  })));

  // Featured-only highlights
  const projects = await Project.find({ isPublished: true, isFeatured: true })
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16 card shadow-craft bg-gradient-to-br from-craft-50/90 via-white/80 to-wood-50/90 dark:from-slatey-800/90 dark:via-slatey-700/80 dark:to-wood-900/90">
        <div className="absolute inset-0 bg-wood-grain opacity-30"></div>
        <div className="relative z-10">
          <p className="text-sm uppercase tracking-widest text-wood-600 dark:text-wood-400 font-medium">Master Craftsman</p>
          <h1 className="mt-3 text-5xl md:text-6xl lg:text-7xl font-craft font-bold leading-[0.9]">
            Handcrafted by{" "}
            <span className="text-wood-600 dark:text-wood-300 relative">
              SathTheBuilder
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent-500 to-wood-500 rounded-full"></div>
            </span>
          </h1>
          <p className="mt-6 text-lg text-slatey-700 dark:text-slatey-200 max-w-2xl leading-relaxed">
            Transforming premium hardwoods into functional art. Every piece tells a story of meticulous craftsmanship,
            timeless design, and unwavering attention to detail.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="btn-primary">
              Start Your Project
            </Link>
            <Link href="/gallery" className="btn-secondary">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section id="highlights" className="card p-6 sm:p-8">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-craft font-semibold text-wood-700 dark:text-wood-300">Featured Work</h2>
            <p className="text-slatey-600 dark:text-slatey-300 mt-1">Showcasing our finest craftsmanship</p>
          </div>
          <Link href="/gallery" className="text-wood-600 hover:text-wood-700 dark:text-wood-400 dark:hover:text-wood-300 font-medium group">
            View All Projects
            <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
          </Link>
        </div>

        {/* Debug info */}
        <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900 rounded text-xs">
          <strong>Homepage Debug:</strong> Found {projects.length} featured projects
          {projects.map((p, i) => (
            <div key={i}>• {p.title} (created: {new Date(p.createdAt).toLocaleDateString()})</div>
          ))}
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-wood-100 dark:bg-wood-800 flex items-center justify-center">
              <span className="text-2xl">🪵</span>
            </div>
            <p className="text-slatey-600 dark:text-slatey-300">No featured projects yet. Mark some projects as &quot;Featured&quot; in Admin.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => {
              const href = `/p/${p.slug || p._id}`;
              const img = p.images?.[0];

              return (
                <Link
                  key={String(p._id)}
                  href={href}
                  className="group card card-hover overflow-hidden"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    {img ? (
                      <Image
                        src={img}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                        priority={false}
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-craft-100 via-wood-100 to-accent-100 dark:from-craft-800 dark:via-wood-800 dark:to-accent-800 flex items-center justify-center">
                        <span className="text-4xl opacity-60">🪵</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-5">
                    {/* Show description preview instead of generic title */}
                    {p.description && p.description.trim() && p.description !== 'Custom woodworking project crafted with attention to detail and quality materials.' ? (
                      <div className="space-y-2">
                        <p className="font-craft font-semibold text-lg text-wood-800 dark:text-wood-200 group-hover:text-wood-600 dark:group-hover:text-wood-300 transition-colors leading-relaxed"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                          {p.description.length > 120 ?
                            p.description.substring(0, 120).replace(/\s+\S*$/, '') + '...' :
                            p.description
                          }
                        </p>
                      </div>
                    ) : (
                      <h3 className="font-craft font-semibold text-lg text-wood-800 dark:text-wood-200 group-hover:text-wood-600 dark:group-hover:text-wood-300 transition-colors">
                        {p.title}
                      </h3>
                    )}

                    {p.tags?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.tags.slice(0, 4).map((t: string) => (
                          <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-craft-100 dark:bg-craft-800 text-craft-800 dark:text-craft-200 border border-craft-200 dark:border-craft-700">
                            {t}
                          </span>
                        ))}
                        {p.tags.length > 4 && (
                          <span className="text-xs px-2.5 py-1 rounded-full bg-craft-100 dark:bg-craft-800 text-craft-600 dark:text-craft-400 border border-craft-200 dark:border-craft-700">
                            +{p.tags.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* About & Services sections */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="card p-8 group hover:shadow-craft transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-wood-100 dark:bg-wood-800 flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <h2 className="text-2xl font-craft font-semibold text-wood-700 dark:text-wood-300">About</h2>
          </div>
          <p className="text-slatey-700 dark:text-slatey-200 leading-relaxed mb-6">
            Meticulous joinery, durable finishes, and timeless design. Tables, shelves, built-ins, and custom commissions crafted with passion and precision.
          </p>
          <Link href="/about" className="inline-flex items-center gap-2 text-wood-600 hover:text-wood-700 dark:text-wood-400 dark:hover:text-wood-300 font-medium group-link">
            Read my story
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <div className="card p-8 group hover:shadow-craft transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-accent-100 dark:bg-accent-800 flex items-center justify-center">
              <span className="text-xl">💰</span>
            </div>
            <h2 className="text-2xl font-craft font-semibold text-wood-700 dark:text-wood-300">Services & Pricing</h2>
          </div>
          <p className="text-slatey-700 dark:text-slatey-200 leading-relaxed mb-6">
            Custom furniture, built-in cabinetry, restoration, and specialty woodworking projects with transparent pricing and quality guarantee.
          </p>
          <Link href="/services" className="inline-flex items-center gap-2 text-wood-600 hover:text-wood-700 dark:text-wood-400 dark:hover:text-wood-300 font-medium group-link">
            View services & pricing
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="card p-8 lg:p-12 bg-gradient-to-br from-craft-50/90 via-white/80 to-wood-50/90 dark:from-craft-900/20 dark:via-slatey-800/80 dark:to-wood-900/20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-craft font-semibold text-wood-700 dark:text-wood-300 mb-3">What Clients Say</h2>
          <p className="text-slatey-600 dark:text-slatey-300">Hear from satisfied customers who chose quality craftsmanship</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card p-6 hover:shadow-wood transition-all duration-300">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-wood-500 text-lg">★</span>
              ))}
            </div>
            <p className="text-slatey-700 dark:text-slatey-200 mb-6 leading-relaxed">
              &quot;The dining table SathTheBuilder created for us is absolutely stunning. The craftsmanship is
              exceptional and it&apos;s become the centerpiece of our home. Worth every penny!&quot;
            </p>
            <div className="border-t border-craft-200 dark:border-craft-700 pt-4">
              <div className="font-craft font-semibold text-wood-700 dark:text-wood-300">Sarah & Mike Johnson</div>
              <div className="text-sm text-craft-600 dark:text-craft-400">Walnut Dining Table</div>
            </div>
          </div>

          <div className="card p-6 hover:shadow-wood transition-all duration-300">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-wood-500 text-lg">★</span>
              ))}
            </div>
            <p className="text-slatey-700 dark:text-slatey-200 mb-6 leading-relaxed">
              &quot;Professional, reliable, and incredibly talented. The custom built-ins transformed our
              living room. The attention to detail is remarkable.&quot;
            </p>
            <div className="border-t border-craft-200 dark:border-craft-700 pt-4">
              <div className="font-craft font-semibold text-wood-700 dark:text-wood-300">David Chen</div>
              <div className="text-sm text-craft-600 dark:text-craft-400">Built-in Entertainment Center</div>
            </div>
          </div>

          <div className="card p-6 hover:shadow-wood transition-all duration-300">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-wood-500 text-lg">★</span>
              ))}
            </div>
            <p className="text-slatey-700 dark:text-slatey-200 mb-6 leading-relaxed">
              &quot;SathTheBuilder restored my grandmother&apos;s antique dresser beautifully. It looks better
              than new while maintaining its original character. Highly recommended!&quot;
            </p>
            <div className="border-t border-craft-200 dark:border-craft-700 pt-4">
              <div className="font-craft font-semibold text-wood-700 dark:text-wood-300">Emily Rodriguez</div>
              <div className="text-sm text-craft-600 dark:text-craft-400">Antique Furniture Restoration</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="card p-8 lg:p-12 text-center bg-gradient-to-r from-wood-600 to-wood-700 text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-craft font-semibold mb-4">Ready to Start Your Project?</h2>
          <p className="text-wood-100 mb-8 text-lg leading-relaxed">
            Get a free consultation and quote. Let&apos;s discuss your vision and bring it to life with expert craftsmanship.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-wood-700 px-8 py-4 rounded-xl font-semibold hover:bg-wood-50 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
            Start Your Project
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}