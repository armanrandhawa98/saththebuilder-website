// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export default async function HomePage() {
  await connectDB();

  // Featured-only highlights
  const projects = await Project.find({ isPublished: true, isFeatured: true })
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="rounded-2xl p-8 sm:p-10 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
        <p className="text-sm uppercase tracking-wide text-slatey-500 dark:text-slatey-400">Custom Woodworking</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight">
          Handcrafted by{" "}
          <span className="text-wood-600 dark:text-wood-300 underline decoration-accent-500 decoration-4 underline-offset-8">
            SathTheBuilder
          </span>
        </h1>
        <p className="mt-4 text-slatey-600 dark:text-slatey-300 max-w-2xl">
          Functional art from premium hardwoods — meticulous joinery, durable finishes, timeless design.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link href="/contact" className="px-5 py-2.5 rounded-xl bg-wood-500 text-white hover:bg-wood-600 font-medium">
            Get a Quote
          </Link>
          <Link href="/gallery" className="px-5 py-2.5 rounded-xl border border-slatey-300 dark:border-slatey-600 hover:shadow-soft font-medium bg-white/60 dark:bg-slatey-800/60">
            View Gallery
          </Link>
        </div>
      </section>

      {/* Highlights */}
      <section id="highlights" className="rounded-2xl p-6 sm:p-8 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold text-wood-600 dark:text-wood-300">Highlights</h2>
          <Link href="/gallery" className="text-sm">See full gallery →</Link>
        </div>

        {projects.length === 0 ? (
          <p className="mt-4 text-slatey-600 dark:text-slatey-300">No highlights yet. Mark some projects as &quot;Featured&quot; in Admin.</p>
        ) : (
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => {
              const href = `/p/${p.slug || p._id}`;
              const img = p.images?.[0];

              return (
                <Link
                  key={String(p._id)}
                  href={href}
                  className="group overflow-hidden rounded-2xl border border-slatey-200 dark:border-slatey-700 bg-white/70 dark:bg-slatey-800/60 shadow-soft block transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    {img ? (
                      <Image
                        src={img}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        priority={false}
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-wood-200/40 to-accent-500/20" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{p.title}</h3>
                    {p.tags?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {p.tags.slice(0, 4).map((t: string) => (
                          <span key={t} className="text-xs px-2 py-0.5 rounded-full border border-slatey-300 dark:border-slatey-600">
                            {t}
                          </span>
                        ))}
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
      <section id="about" className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl p-6 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
          <h2 className="text-xl font-semibold text-wood-600 dark:text-wood-300">About</h2>
          <p className="mt-3 text-slatey-600 dark:text-slatey-300">Meticulous joinery, durable finishes, and timeless design. Tables, shelves, built-ins, and custom commissions.</p>
          <Link href="/about" className="mt-4 inline-block text-sm text-wood-500 hover:text-wood-600 underline">
            Read my story →
          </Link>
        </div>
        <div className="rounded-2xl p-6 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
          <h2 className="text-xl font-semibold text-wood-600 dark:text-wood-300">Services & Pricing</h2>
          <p className="mt-3 text-slatey-600 dark:text-slatey-300">Custom furniture, built-in cabinetry, restoration, and specialty woodworking projects.</p>
          <Link href="/services" className="mt-4 inline-block text-sm text-wood-500 hover:text-wood-600 underline">
            View services & pricing →
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="rounded-2xl p-8 bg-wood-50 dark:bg-wood-900/10 border border-wood-200 dark:border-wood-800">
        <h2 className="text-2xl font-semibold text-wood-600 dark:text-wood-300 text-center mb-8">What Clients Say</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/70 dark:bg-slatey-800/60 rounded-xl p-6 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-wood-400 text-lg">★</span>
              ))}
            </div>
            <p className="text-slatey-700 dark:text-slatey-200 mb-4">
              &quot;The dining table SathTheBuilder created for us is absolutely stunning. The craftsmanship is
              exceptional and it&apos;s become the centerpiece of our home. Worth every penny!&quot;
            </p>
            <div className="font-semibold text-wood-600 dark:text-wood-300">Sarah & Mike Johnson</div>
            <div className="text-sm text-slatey-500">Walnut Dining Table</div>
          </div>

          <div className="bg-white/70 dark:bg-slatey-800/60 rounded-xl p-6 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-wood-400 text-lg">★</span>
              ))}
            </div>
            <p className="text-slatey-700 dark:text-slatey-200 mb-4">
              &quot;Professional, reliable, and incredibly talented. The custom built-ins transformed our
              living room. The attention to detail is remarkable.&quot;
            </p>
            <div className="font-semibold text-wood-600 dark:text-wood-300">David Chen</div>
            <div className="text-sm text-slatey-500">Built-in Entertainment Center</div>
          </div>

          <div className="bg-white/70 dark:bg-slatey-800/60 rounded-xl p-6 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-wood-400 text-lg">★</span>
              ))}
            </div>
            <p className="text-slatey-700 dark:text-slatey-200 mb-4">
              &quot;SathTheBuilder restored my grandmother&apos;s antique dresser beautifully. It looks better
              than new while maintaining its original character. Highly recommended!&quot;
            </p>
            <div className="font-semibold text-wood-600 dark:text-wood-300">Emily Rodriguez</div>
            <div className="text-sm text-slatey-500">Antique Furniture Restoration</div>
          </div>
        </div>
      </section>

      <section id="contact" className="rounded-2xl p-6 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
        <h2 className="text-xl font-semibold text-wood-600 dark:text-wood-300">Contact</h2>
        <p className="mt-3 text-slatey-600 dark:text-slatey-300">Ready to discuss your project? Get a free consultation and quote.</p>
        <Link href="/contact" className="mt-4 inline-block text-sm text-wood-500 hover:text-wood-600 underline">
          Get started →
        </Link>
      </section>
    </div>
  );
}