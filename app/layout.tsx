import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luciano Flores — Full Stack Developer",
  description:
    "Portfolio de Luciano Rafael Flores, Full Stack Developer en Salta, Argentina. React, Next.js, Node.js, TypeScript y Python. 3+ años construyendo aplicaciones web end-to-end.",
  openGraph: {
    title: "Luciano Flores — Full Stack Developer",
    description:
      "React · Next.js · Node.js · TypeScript · Python. Aplicaciones web escalables end-to-end desde Salta, Argentina.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg font-body text-ink antialiased">
        {children}
        {/* grano sutil sobre toda la página */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[90] opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </body>
    </html>
  );
}
