"use client";
import React, { useState, useEffect } from 'react';
import Button from '../components/modal/boton';
import Nav from '../components/nav/nav';

export default function Notas() {

  const [notas, setNotas] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/notas');
      const data = await response.json();
      setNotas(data);
    } catch (error) {
      console.error('Error al obtener las notas:', error);
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
        <Button/>
      </div>
      <div className='m-3'>
        <h1>Nota</h1>
        <div>
          <div className="row text-center">
            {notas.map(nota => (
              <div key={nota._id} className="m-1 col-sm-2">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{nota.nombre}</h5>
                    <p className="card-text">{nota.nota}</p>
                    <button className="btn btn-danger">Eliminar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



