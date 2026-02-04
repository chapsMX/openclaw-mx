import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
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
    default: "OpenClaw.mx | Instalación de tu Asistente IA Personal",
    template: "%s | OpenClaw.mx",
  },
  description:
    "Instalamos y configuramos tu Asistente Virtual IA en 5 minutos. Self Hosted (Mac Mini) o Managed Hosting (VPS). Disponible 24/7 en WhatsApp, Telegram y Discord.",
  keywords: [
    "OpenClaw",
    "asistente virtual",
    "IA",
    "inteligencia artificial",
    "chatbot",
    "automatización",
    "México",
    "WhatsApp bot",
    "Telegram bot",
  ],
  authors: [{ name: "OpenClaw.mx" }],
  creator: "OpenClaw.mx",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://openclaw.mx",
    siteName: "OpenClaw.mx",
    title: "OpenClaw.mx | Tu Asistente IA Personal 24/7",
    description:
      "Instalamos y configuramos tu Asistente Virtual IA en 5 minutos. Disponible en WhatsApp, Telegram y Discord.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OpenClaw - Tu Asistente IA Personal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw.mx | Tu Asistente IA Personal 24/7",
    description:
      "Instalamos y configuramos tu Asistente Virtual IA en 5 minutos.",
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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TFB3F6ZV');`,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-[family-name:var(--font-body)] antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TFB3F6ZV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
