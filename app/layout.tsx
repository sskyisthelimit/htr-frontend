import '../src/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link
            rel="icon"
            href="/icon192.png"
            type="image/png"
            sizes="192x192"
          />
          <link
            rel="icon"
            href="/icon512.png"
            type="image/png"
            sizes="512x512"
          />
          <link
            rel="apple-touch-icon"
            href="/apple-icon.png"
            type="image/png"
            sizes="any"
          />
      </head>
      <body>{children}</body>
    </html>
  )
}
