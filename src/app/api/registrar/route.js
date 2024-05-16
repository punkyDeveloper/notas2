import User from "../../../models/user";
import { connectDB } from "../../../libs/conectio";
import { NextResponse } from "next/server";


export async function  POST(req, res) {
  
  const { fullName, email, password } = await req.json();

      
  try {

    await connectDB()
    const user = new User({ 
      fullName,
      email,
      password,
    })
    await user.save();

    // Devuelve una respuesta de éxito
    return  NextResponse.redirect(process.env.REACT_APP_ruta);
  } catch (error) {
    console.error(error);
    // Devuelve una respuesta de error
    return NextResponse.error('Error al guardar los datos. Por favor, inténtalo de nuevo.');
  }
}


