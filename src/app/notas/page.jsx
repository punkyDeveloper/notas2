"use client";
import React, { useState, useEffect } from 'react';
import Buttons from '../components/modal/boton';
import Nav from '../components/nav/nav';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function Notas() {
  const [notas, setNotas] = useState([]);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/notas');
      const data = await response.json();
      console.log(data)
      if (Array.isArray(data) && data.length > 0) {
        setNotas(data);
      } else {
        setError('No se encontraron notas.');
      }
    } catch (error) {
      console.error('Error al obtener las notas:', error);
      setError('Error al obtener las notas.');
    }
  };

  // Llama a fetchData cuando el componente se monte
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Nav /> 
      <div>
        <Buttons/>
      </div>
      <div className='m-3'>
        <h1 >Nota</h1>
        <div>
                  {/* Conditionally render error message */}
        {error && (
          <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p className="font-bold">¡Atención!</p>
            <p>{error}</p>
          </div>
        )}


            {notas.map(nota => (

              //  <Card  style={{ width: '18rem' }}>
              <Card style={{ width: '18rem' }}>
                      <Card.Header >{nota.nombre}</Card.Header>
                      <Card.Body>
                        <Card.Text>
                        {nota.nota}
                        </Card.Text>
                        <Button variant="danger">Eliminar</Button>
                      </Card.Body>
                      </Card>


            ))}

        </div>
      </div>
    </div>
  );
}