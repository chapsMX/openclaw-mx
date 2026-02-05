import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getPostBySlug, getAllPosts } from "@/lib/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return { title: "Post no encontrado" };
  }

  return {
    title: `${post.title} | OpenClaw.mx`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Simple markdown-like parsing
  const parseContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: JSX.Element[] = [];
    let inList = false;
    let listItems: string[] = [];
    let inTable = false;
    let tableRows: string[][] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc pl-6 mb-6 space-y-2 text-claw-black/70">
            {listItems.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
            ))}
          </ul>
        );
        listItems = [];
      }
      inList = false;
    };

    const flushTable = () => {
      if (tableRows.length > 0) {
        const header = tableRows[0];
        const body = tableRows.slice(2); // Skip header and separator
        elements.push(
          <div key={`table-${elements.length}`} className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-3 border-claw-black">
              <thead className="bg-claw-green">
                <tr>
                  {header.map((cell, i) => (
                    <th key={i} className="text-left py-3 px-4 font-bold text-claw-black border-b-3 border-claw-black">
                      {cell.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, i) => (
                  <tr key={i} className="border-b border-claw-black/20">
                    {row.map((cell, j) => (
                      <td key={j} className="py-3 px-4 text-claw-black/70">
                        {cell.trim()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
      }
      inTable = false;
    };

    const parseInline = (text: string) => {
      return text
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-claw-black font-semibold">$1</strong>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-claw-red underline hover:text-claw-red-dark">$1</a>');
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Table detection
      if (line.startsWith("|")) {
        if (!inTable) {
          flushList();
          inTable = true;
        }
        const cells = line.split("|").filter((c) => c.trim() !== "");
        if (!line.includes("---")) {
          tableRows.push(cells);
        } else {
          tableRows.push([]); // Separator placeholder
        }
        continue;
      } else if (inTable) {
        flushTable();
      }

      // Headers
      if (line.startsWith("## ")) {
        flushList();
        elements.push(
          <h2 key={`h2-${i}`} className="text-2xl font-bold text-claw-black mt-10 mb-4">
            {line.replace("## ", "")}
          </h2>
        );
        continue;
      }

      if (line.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={`h3-${i}`} className="text-xl font-bold text-claw-black mt-8 mb-3">
            {line.replace("### ", "")}
          </h3>
        );
        continue;
      }

      // Blockquote
      if (line.startsWith("> ")) {
        flushList();
        elements.push(
          <blockquote key={`bq-${i}`} className="border-l-4 border-claw-red pl-4 my-6 italic text-claw-black/60">
            {line.replace("> ", "").replace(/"/g, "")}
          </blockquote>
        );
        continue;
      }

      // List items
      if (line.startsWith("- ")) {
        inList = true;
        listItems.push(line.replace("- ", ""));
        continue;
      } else if (inList && line.trim() === "") {
        flushList();
        continue;
      } else if (inList) {
        flushList();
      }

      // Paragraphs
      if (line.trim() !== "") {
        elements.push(
          <p
            key={`p-${i}`}
            className="text-claw-black/70 mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: parseInline(line) }}
          />
        );
      }
    }

    flushList();
    flushTable();
    return elements;
  };

  return (
    <main className="min-h-screen bg-claw-white">
      <Navbar />

      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-claw-black/50 mb-8 font-mono">
            <Link href="/" className="hover:text-claw-black transition">
              Inicio
            </Link>
            <span>→</span>
            <Link href="/blog" className="hover:text-claw-black transition">
              Blog
            </Link>
            <span>→</span>
            <span className="text-claw-black/70">{post.title}</span>
          </div>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-mono px-3 py-1 bg-claw-green border-2 border-claw-black text-claw-black font-bold">
                {post.category}
              </span>
              <span className="text-claw-black/50 text-sm">{post.date}</span>
              <span className="text-claw-black/50 text-sm">• {post.readTime} de lectura</span>
            </div>
            <h1 className="text-display text-4xl md:text-5xl text-claw-black mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-claw-black/60">{post.description}</p>
            <div className="w-24 h-1 bg-claw-red mt-6" />
          </header>

          {/* Content */}
          <div className="prose-brutal">{parseContent(post.content)}</div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 bg-claw-green border-t-3 border-claw-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-claw-black mb-4">
            ¿Listo para tu propio asistente IA?
          </h2>
          <p className="text-claw-black/70 mb-6">
            Desplegamos y configuramos OpenClaw para ti en 5 minutos.
          </p>
          <Link
            href="/#plans"
            className="inline-block bg-claw-red text-white font-bold px-8 py-4 text-base uppercase tracking-wider border-3 border-claw-black shadow-[4px_4px_0px_#0a0a0a] hover:shadow-[2px_2px_0px_#0a0a0a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            Ver Opciones
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
