import User from "../../../models/user";
import { connectDB } from "../../../libs/conectio"; // Corregido el nombre del archivo de conexión
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { email, password } = req.body; // Cambiado de req.json() a req.body

    console.log("Correo:", email);
    console.log("Contraseña:", password);

    // Conectar a la base de datos
    await connectDB();

    // Buscar usuarios en la base de datos
    const usuarios = await User.find();

    console.log("Usuarios encontrados:", usuarios);

    // Enviar respuesta al cliente con los usuarios encontrados
    return NextResponse.json(usuarios);
  } catch (error) {
    console.error("Error:", error);
    // Enviar una respuesta de error al cliente si algo salió mal
    return NextResponse.error(error.message, { status: 500 });
  }
}
