import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openclaw.mx"),
  title: {
    default: "Instalación de OpenClaw | Tu asistente virtual IA",
    template: "%s | OpenClaw.mx",
  },
  description:
    "Instalación de OpenClaw. Desplegamos y configuramos tu Asistente Virtual IA. Opciones en Self Hosted o Managed Hosting. Tu asistente personal 24/7.",
  keywords: [
    "OpenClaw",
    "asistente virtual",
    "IA",
    "inteligencia artificial",
    "chatbot",
    "automatización",
    "México",
    "instalación",
    "VPS",
    "Mac Mini",
  ],
  authors: [{ name: "OpenClaw.mx" }],
  creator: "OpenClaw.mx",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://openclaw.mx",
    siteName: "OpenClaw.mx",
    title: "Instalación de OpenClaw | Tu asistente virtual IA",
    description:
      "Instalación de OpenClaw. Desplegamos y configuramos tu Asistente Virtual IA. Opciones en Self Hosted o Managed Hosting. Tu asistente personal 24/7.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Instalación de OpenClaw | Tu asistente virtual IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Instalación de OpenClaw | Tu asistente virtual IA",
    description:
      "Instalación de OpenClaw. Desplegamos y configuramos tu Asistente Virtual IA. Opciones en Self Hosted o Managed Hosting. Tu asistente personal 24/7.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QHR7TMZHER"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QHR7TMZHER');
          `}
        </Script>
        
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://openclaw.mx/",
                  "url": "https://openclaw.mx/",
                  "name": "Instalación de OpenClaw | Tu asistente virtual IA",
                  "isPartOf": {"@id": "https://openclaw.mx/#website"},
                  "about": {"@id": "https://openclaw.mx/#organization"},
                  "description": "Instalación de OpenClaw. Desplegamos y configuramos tu Asistente Virtual IA. Opciones en Self Hosted o Managed Hosting. Tu asistente personal 24/7.",
                  "inLanguage": "es-MX"
                },
                {
                  "@type": "WebSite",
                  "@id": "https://openclaw.mx/#website",
                  "url": "https://openclaw.mx/",
                  "name": "Instalación OpenClaw",
                  "description": "Instalación de OpenClaw. Desplegamos y configuramos tu Asistente Virtual IA. Opciones en Self Hosted o Managed Hosting. Tu asistente personal 24/7.",
                  "publisher": {"@id": "https://openclaw.mx/#organization"},
                  "inLanguage": "es-MX"
                },
                {
                  "@type": "Organization",
                  "@id": "https://openclaw.mx/#organization",
                  "name": "OpenClaw.mx",
                  "url": "https://openclaw.mx/",
                  "description": "Servicio de instalación y configuración de asistentes virtuales OpenClaw en México"
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-[family-name:var(--font-body)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
