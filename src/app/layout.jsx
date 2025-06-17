export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <title>Opération SAJ - Mission Secrète</title>
        <meta
          name="description"
          content="Mission d'espionnage interactive à travers les secrets de Molsheim"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
