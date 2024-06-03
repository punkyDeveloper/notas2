import User from "../../../models/user";
import { connectDB } from "../../../libs/conectio";
import { NextResponse } from "next/server";

export async function  POST(req, res) {
  
  const { fullName, email, password } = await req.json();

      
  try {
      await connectDB()
    const usuario = await User.findOne({ email});
    console.log(usuario)
    if (!usuario) {
      const user = new User({ 
        fullName,
        email,
        password,
      })
      await user.save();
  
      // Devuelve un objeto JSON indicando éxito y la redirección
      return NextResponse.json({ success: true }, { status: 200 });
      
    } else {
      return NextResponse.error("Cliente ya existe");
    }
  } catch (error) {
    console.error(error);
    // Devuelve una respuesta de error
    return NextResponse.error('Error del servidor.');
  }
}


