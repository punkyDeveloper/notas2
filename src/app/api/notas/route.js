import Notas from "../../../models/agendas";
import { connectDB } from "../../../libs/conectio";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function  POST(req, res) {

  const { nombre, nota, usuarioId } = await req.json()
  console.log(usuarioId)
  if (!usuarioId) {
    NextResponse.json(
      { message: 'no llego el id' },
      { status: 400 }
    )
  }
  if (!nombre) {
    return (
      NextResponse.json(
        { message: 'Ingresa un titulo' },
        { status: 400 }
      )
    )
  }
  if (!nota) {
    return (
      NextResponse.json(
        { message: 'Ingresa una nota' },
        { status: 400 }
      )
    )
  }

  try {
    await connectDB()

    const agenda = new Notas({ 
      nombre,
      nota,
      usuarioId
           
    })
    const datos = await agenda.save()
    if (datos) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

  } catch (error) {
    console.error("No se guardo la nota tenemos un error", error)
  }
}
// Ver todas las notas 
export async function  GET(req, res) {
  await connectDB();
  const cookieStore = cookies();
  const usuarioId = cookieStore.get('token')?.value;
  try {

      const notas = await Notas.find({usuarioId});

      return NextResponse.json(notas, { status: 200 });

  } catch (error) {
      console.error("Error al obtener las notas:", error);
      return {
          status: 500,
          body: { error: "Error al obtener las notass" }
      };
  }
}
// Eliminar notas 
export async function DELETE(req, res) {
  try {
    await connectDB();
    const body = await req.json(); 
    const { id } = body;
    console.log(id);

    if (!id) {

      console.log("No se encontro id")
      return NextResponse.json("No se encontro id");
      
    }
    const nn = await Notas.deleteOne({ _id:id });
    if (nn.deletedCount === 0) {
      console.log("No se encontró ningún documento con ese id");
      return NextResponse.json({ message: "No se encontró ningún documento con ese id" }, { status: 404 });
    }

    console.log("Se eliminó");
    return NextResponse.json({ message: "Se eliminó: " + id }, { status: 200 });

  } catch (error) {
    console.error('Error deleting note:', error);

  }
}