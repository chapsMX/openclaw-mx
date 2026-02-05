import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog | OpenClaw.mx",
  description: "Artículos sobre asistentes IA, automatización, y productividad personal.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-claw-white">
      <Navbar />
      
      <section className="pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-claw-black mb-4">
              Blog
            </h1>
            <p className="text-claw-black/60 text-lg max-w-2xl">
              Artículos sobre asistentes IA, automatización, y productividad personal.
            </p>
            <div className="w-24 h-1 bg-claw-red mt-6" />
          </div>

          {/* Posts Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-claw-white border-3 border-claw-black p-6 shadow-[4px_4px_0px_#0a0a0a] hover:shadow-[6px_6px_0px_#0a0a0a] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150"
              >
                {/* Category & Date */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono px-3 py-1 bg-claw-green border-2 border-claw-black text-claw-black font-bold">
                    {post.category}
                  </span>
                  <span className="text-sm text-claw-black/50">{post.readTime}</span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-claw-black mb-3 group-hover:text-claw-red transition-colors">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-claw-black/60 text-sm line-clamp-3">
                  {post.description}
                </p>

                {/* Date */}
                <p className="text-sm text-claw-black/40 mt-4 font-mono">
                  {post.date}
                </p>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-claw-black/50 text-lg">No hay posts todavía.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
