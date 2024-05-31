"use client";
"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Buttons from '../components/modal/boton';
import Nav from '../components/nav/nav';

export default function Notas() {
  const [notas, setNotas] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('');

  const fetchData = async () => {
    try {
      const url = '/api/notas';
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${userId}`
        }
      });
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setNotas(data);
      } else {
        setError('No se encontraron notas, ingrese una nota');
      }
    } catch (error) {
      console.error('Error al obtener las notas:', error);
      setError('Error al obtener las notas.');
    }
  };

  // Leer la cookie al cargar la página
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setUserId(token);
      fetchData();
    }
  }, []);

  return (
    <div>
      <Nav userId={userId} /> 
      <div>
        <Buttons />
      </div>
      <div className='m-3'>
        <h1>Nota</h1>
        <div>
          {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p>{error}</p>
          </div>
          )}

          <div className="row text-center m-5">
            {notas.map(nota => (
              <div key={nota._id} className="m-1 col-sm-2">
                <div className="card">
                  <div className="card-body">  
                    <div className="card-header">
                      {nota.nombre}
                    </div>
                    <p className="card-text">{nota.nota}</p>
                    <button className="btn btn-primary m-2">Editar</button>
                    <button className="btn btn-danger m-2">Eliminar</button>
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
