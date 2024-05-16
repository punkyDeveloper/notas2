import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example() {
  // boostrap
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //
  const [nombre, setNombre] = useState('');
  const [nota, setNota] = useState('');
  const [error, setError] = useState(null);
  const [exit, setExit] = useState(null);

  const enviarNota = async (e) =>{
    e.preventDefault();
    // validaciones
    if (!nombre || !nota) {
      setError("Complete los campos de la nota.");
      return;
    }
    const userId = 123;
    try {
      await fetch("/api/notas",{
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ nombre, nota, userId }), // Pasar el ID del usuario al servidor
      });
      if (nombre && nota) {
        setExit("Se creo con exito su nota (Recarga la pagina).");
        return;
      }
      // Limpiar los campos después de enviar la nota
      setNombre('');
      setNota('');
    } catch (error) {
      setError("Error al enviar la nota");
      console.error('Error al enviar la nota:', error);
    }
  };

  return (
    <>
      <Button className="m-3" variant="primary" onClick={handleShow}>
        Crear nota
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <form onSubmit={enviarNota}>


              <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
  
                {/* Conditionally render error message */}
                {error && (
                  <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                    <p className="font-bold">¡Atención!</p>
                    <p>{error || exit}</p>
                  </div>
                )}
                {exit && (
                  <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
                    <p className="font-bold"></p>
                    <p>{exit}</p>
                  </div>
                )}
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                <Button variant="primary" type="submit">Crear nota</Button>
        </Modal.Footer>


        </form>
        </Modal>
    </>
  );
}

export default Example;