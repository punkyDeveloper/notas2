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
  await connectDB();
  try {
    const id = await req.query && req.query.userId
    console.log(id)
    return (
      NextResponse.json(id)
    )
    // const notas = await Notas.find({userId});
    //   console.log("mi id1 ")
    //   console.log("mi id "+notas)

      // Verificar si el ID está presente
      // if (!id) {
      //     return NextResponse.json({ error: 'ID de la nota no proporcionado' }, { status: 400 });
      // }

      // const notaEliminada = await Notas.findByIdAndDelete(id); // Usar directamente el ID

      // if (!notaEliminada) {
      //     return NextResponse.json({ error: 'Nota no encontrada' }, { status: 404 });
      // }

      // return NextResponse.json({ message: 'Nota Eliminada', notaEliminada }, { status: 200 });

  } catch (error) {
      console.error("Error al eliminar la nota", error);
      return NextResponse.json({ error: "Error al eliminar la nota" }, { status: 500 });
  }
}