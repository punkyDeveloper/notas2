import Notas from "../../../models/agendas";
import { connectDB } from "../../../libs/conectio";
import { NextResponse } from "next/server";

export async function  POST(req, res) {

  const { nombre, nota } = await req.json()

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
      nota
    })
    const datos = await agenda.save()
    console.log(datos)
    const buscarid = await Notas.find({_id:datos._id} )
    console.log(buscarid)
    return (
      NextResponse.json(
        { message: 'Nota creada' },
        { status: 201 }
      )
    )
  } catch (error) {
    console.error("No se guardo la nota tenemos un error", error)
  }
}
// Ver todas las notas 
export async function  GET(req, res) {
  await connectDB();

  try {
      const notas = await Notas.find();

      return (
         NextResponse.json(notas,
          { message: 'Las notas' },
          { status: 201 }
        )
      )
      // return {
      //     status: 200,
      //     body: notas
      // };
  } catch (error) {
      console.error("Error al obtener las notas:", error);
      return {
          status: 500,
          body: { error: "Error al obtener las notas" }
      };
  }
}
// Eliminar notas 
export async function DELETE(req, res) {
  await connectDB();
  try {
    const id = await req.query && req.query._id
    console.log(id)
    return (
      NextResponse.json(id)
    )
    // const notas = await Notas.find({_id});
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