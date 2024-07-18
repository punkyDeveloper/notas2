import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example({ notas }) {
  const { nombre, nota, _id } = notas || {};

  // boostrap
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Estados para los datos de la nota
  const [nombres, setNombre] = useState(nombre);
  const [not, setNota] = useState(nota);
  const [id, setId] = useState(_id);
  const [error, setError] = useState(null);
  const [exit, setExit] = useState(null);

  // Efecto para cargar los datos de la nota al abrir el modal
  useEffect(() => {
    setNombre(nombre);
    setNota(nota);
    setId(_id);
  }, [nombre, nota, _id]);

  const actualizarNota = async (e) => {
    e.preventDefault();
    console.log(nombres);
    console.log(not);
    console.log(id);

    // Validaciones
    if (!nombres || !not) {
      setError("Complete los campos de la nota.");
      return;
    }
    if (not.length < 6) {
      setError("Nota tiene que ser mayor 7 caracteres.");
      return;
    }
    const usuarioId = _id;
    if (!usuarioId) {
      setError("No es posible guardar la nota.");
      return;
    }

    try {
      const acti = await fetch("/api/notas", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ nombres, not, usuarioId }),
      });
      console.log(acti.ok);
      if (acti.ok) {
        setExit("Se actualizó con éxito su nota.");
        window.location.reload();

        // Puedes agregar una lógica para actualizar el estado o la UI si es necesario
      } else {
        const errorData = await acti.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("Error al enviar la nota");
      console.error('Error al enviar la nota:', error);
    }
  };

  return (
    <>
      <Button className="m-3" variant="primary" onClick={handleShow}>
        Ver nota
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <form onSubmit={actualizarNota}>
          <Modal.Header closeButton>
            <Modal.Title>Nota</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              onChange={(e) => setId(e.target.value)}
              value={id}
              type="hidden"
              className="border-4 border-b-black px-4 py-2 block mb-2 w-full"
              name="fullName"
              id="fullName"
            />
            <label className="text-zinc-800">Título:</label>
            <input
              onChange={(e) => setNombre(e.target.value)}
              value={nombres}
              type="text"
              className="border-4 border-b-black px-4 py-2 block mb-2 w-full"
              name="fullName"
              id="fullName"
            />

            <label className="text-zinc-800">Nota:</label>
            <textarea
              onChange={(e) => setNota(e.target.value)}
              value={not}
              type="text"
              className="border-4 border-b-black px-4 py-2 block mb-2 w-full"
              name="text"
              id="text"
            />

            {/* Conditionally render error message */}
            {error && (
              <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                <p className="font-bold">¡Atención!</p>
                <p>{error}</p>
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
            <Button variant="primary" type="submit">Actualizar nota</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default Example;
