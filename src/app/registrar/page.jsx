"use client";
import { useState } from "react";

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);



  const handleSubmit = async (e) => {
    e.preventDefault();

    // validaciones
    if (!fullName || !email || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    if (password.length < 6) {
      setError("la contraseña tiene que ser mayor a 6 dijitos.");
      return;
    }

    // Envia los datos
    try {
      const url = "/api/registrar"
      const response = await fetch(url, { 
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      // valida que si devuelva datos 

      if (response.ok) {
        const data = await response.json();
        console.log("Respuesta del servidor:", data);
        window.location.href = '/';
      } else {
        setError('El correo ya se encuentra en uso.');
      }
    } catch (error) {
      console.error(error);
      setError('Error al guardar los datos. Por favor, inténtalo de nuevo.');
    }

  };

  return (
    
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
      
      <form onSubmit={handleSubmit} className="bg-neutral-950 px-8 py-10 w-3/12">
        
        <h1 className="text-4xl font-bold mb-7 text-slate-300">Registrar</h1>

        <label className="text-slate-300">Nombre:</label>
        <input
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
          type="text"
          placeholder="Santiago"
          className="border-4 border-b-black px-4 py-2 block mb-2 w-full"
          name="fullName"
          id="fullName"
        />

        <label className="text-slate-300">Email:</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="santi@gmail.com"
          className="border-4 border-b-black px-4 py-2 block mb-2 w-full"
          name="email"
          id="email"
        />

        <label className="text-slate-300">Contraseña:</label>
        <input
          onChange={(e) => setPassword(e.target.value)} // Corregido aquí
          value={password}
          type="password"
          placeholder="*****************"
          className="border-4 border-b-black px-4 py-2 block mb-2 w-full"
          name="password"
          id="password"
        />
        {/* Conditionally render error message */}
        {error && (
          <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p className="font-bold">¡Atención!</p>
            <p>{error}</p>
          </div>
        )}
        <button type="sudmit" className="bg-blue-500 text-white px-4 py-2 block w-full mt-4">
          Registrar
        </button>
        <a href="/" className="font-semibold leading-6 text-blue hover:text-indigo-500">
            Login
          </a>
        <br />

      </form>
      
    </div>
    
  );
}

export default Signup;
