'use server'
import User from "../../../models/user";
import { connectDB } from "../../../libs/conectio"; 
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req, res) {
  const { email, password } = await req.json();

  try {
    // Conectar a la base de datos
    await connectDB();

    // Buscar usuario en la base de datos
    const usuario = await User.findOne({ email, password });

    if (usuario) {
      console.log("Usuario encontrado:", usuario);

      //
      const galleta =cookies().set("token", usuario._id.toString());

      console.log(process.env.REACT_APP_ruta)
      if (galleta) {
        return NextResponse.json({ success: true,usuario }, { status: 200 });
      } else {
        return res.status(500).json({ error: "No se pudo crear la cookie" });
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
