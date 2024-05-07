"use client";
import { useState } from "react";

function Example() {
  const [nombre, setNombre] = useState('');
  const [nota, setNota] = useState('');
  const [error, setError] = useState(null);

  const enviarNota = async (e) =>{
    e.preventDefault();
    // validaciones
    if (!nombre || !nota) {
      setError("Comple los campos de la nota.");
      return;
    }
const userId = 123
    try {
      await fetch("/api/notas",{
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ nombre, nota, userId }), // Pasar el ID del usuario al servidor
      })
    } catch (error) {
      setError("Error al enviar la nota")
      console.error('Error al enviar la nota:', error);
      return
    }

    // Limpiar los campos después de enviar la nota
    setNombre('');
    setNota('');
  };

  
  return (
    <>
     

  <button type="button" className="m-3 btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    Crear una nota
</button>

<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
<form onSubmit={enviarNota}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Crear una nota</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>


        <div className="modal-body">
        <label className="text-zinc-800">Titulo:</label>
          <input
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
            type="text"
            className="border-4 border-b-black px-4 py-2 block mb-2 w-full"
            name="fullName"
            id="fullName"
          />
  
          <label className="text-zinc-800">Nota:</label>
          <input
            onChange={(e) => setNota(e.target.value)}
            value={nota}
            type="text"
            className="border-4 border-b-black px-4 py-2 block mb-2 w-full"
            name="text"
            id="text"
          />
        </div>
        {/* Conditionally render error message */}
        {error && (
          <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p className="font-bold">¡Atención!</p>
            <p>{error}</p>
          </div>
        )}

      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="submit" className="btn btn-primary">Crear Nota</button>
      </div>
    </div>
  </div>
</form>
</div>
    </>
  );
}

export default Example;