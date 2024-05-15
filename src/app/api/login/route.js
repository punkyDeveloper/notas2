'use server'
import User from "../../../models/user";
import { connectDB } from "../../../libs/conectio"; 
import { NextResponse } from "next/server";
import { cookie } from 'next/headers';

export async function POST(req, res) {
  const { email, password } = await req.json();

  console.log("Correo:", email);
  console.log("Contraseña:", password);

  try {
    // Conectar a la base de datos
    await connectDB();

    // Buscar usuario en la base de datos
    const usuario = await User.findOne({ email, password });

    if (usuario) {
      console.log("Usuario encontrado:", usuario);

      //
      const cookies = cookie();
      cookies.set('user', 'johndoe');
      //

      // Almacenar los datos del usuario en sessionStorage
      // req.session.set('usuario', usuario);
      // await req.session.save();

      // Devolver respuesta al cliente con el usuario encontrado
      return NextResponse.json(usuario );
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
