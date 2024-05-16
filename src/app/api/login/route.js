'use server'
import User from "../../../models/user";
import { connectDB } from "../../../libs/conectio"; 
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req, res) {
  const { email, password } = await req.json();

  console.log("Correo:", email);
  console.log("Contraseña:", password);

  try {
    // Conectar a la base de datos
    await connectDB();
    // Access LOGIN environment variable securely
    const loginUrl = process.env.REACT_APP_ruta; // Assuming your variable is named LOGIN

    console.log("Login URL:", loginUrl); // Use loginUrl for login logic if needed

    // Buscar usuario en la base de datos
    const usuario = await User.findOne({ email, password });

    if (usuario) {
      console.log("Usuario encontrado:", usuario);

      //
      console.log(cookies().get("access-token"));
      const galleta =cookies().set("token", usuario._id);

      //
      if (galleta) {
        console.log("hola")
        return NextResponse.redirect(process.env.REACT_APP_ruta);
      }
    } else {
      console.log("Usuario no encontrado");
      // Enviar una respuesta al cliente si el usuario no se encuentra
      return NextResponse.error("Usuario no encontrado", { status: 404 });
    }
  } catch (error) {
    console.error("Error:", error);
    // Enviar una respuesta de error al cliente si algo salió mal
    return NextResponse.error(error.message, { status: 500 });
  }
}
