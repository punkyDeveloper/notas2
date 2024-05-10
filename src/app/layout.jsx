import React from "react";
import "./globals.css";
import "./boostrap.css"

// Metadatos del sitio
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
