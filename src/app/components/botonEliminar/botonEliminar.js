import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example({ id, name }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState(null);

  const eliminarNota = async (e) => {
    e.preventDefault();
    console.log(id);
    if (!id) {
      setError("No se puede eliminar la nota.");
      return;
    }
    try {
      await fetch(`/api/notas?id=${id}`, { // Enviar el id como parte de la URL
        method: "DELETE",
      });
    } catch (error) {
      setError("Error al eliminar la nota");
      console.error('Error al eliminar la nota: ', error);
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Eliminar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={eliminarNota}>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar Nota "{name}"</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              value={id}
              type="hidden"
              className="border-4 border-b-black px-4 py-2 block mb-2 w-full"
              name="fullName"
              id="fullName"
              disabled
            />
            {error && (
              <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                <p className="font-bold">¡Atención!</p>
                <p>{error}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Salir
            </Button>
            <Button type="submit" variant="primary" type="submit">
              Eliminar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default Example;
