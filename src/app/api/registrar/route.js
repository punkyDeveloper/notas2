import User from "../../../models/user";
import { connectDB } from "../../../libs/conectio";
import { NextResponse } from "next/server";
import { redirect } from 'next/navigation'

export async function  POST(req, res) {
  
  const { fullName, email, password } = await req.json();

  console.log("nombre", fullName)
  console.log("correo", email)
  console.log("contraseña", password)

  // if (password.length < 6) {
  //   return (
  //     NextResponse.json(
  //       { message: 'Password must be at least 6 characters' },
  //       { status: 400 }
  //       )
  //       )
  // }
  // if (!nombre) {
  //   return (
  //     NextResponse.json(
  //       { message: 'ingresa un nombre' },
  //       { status: 400 }
  //     )
  //   )
  // }
  // if (!correo) {
  //   return (
  //     NextResponse.json(
  //       { message: 'ingresa un correo' },
  //       { status: 400 }
  //     )
  //   )
  // }
              
  try {
    await connectDB()
    const user = new User({ 
      fullName,
      email,
      password,
    })
    await user.save()
    // return res.status(200).json({ redirect: '/' });
  } catch (error) {
    console.log(error)
    
  }
  revalidatePath('/')
  redirect(`/`)
}



