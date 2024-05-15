import React from "react";
import "./globals.css";
import "./boostrap.css"

// Metadatos del sitio
export const metadata = {
  title: "Notas del punky",
  description: "Creado por punky",
  name:"viewport", content:"width=device-width, initial-scale=1"
};

// Componente RootLayout
export default function RootLayout({ children }) {
  return (
    <html lang="es">

      <body>{children}</body>

      
    </html>
  );
}
