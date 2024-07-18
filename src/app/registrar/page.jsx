"use client";
import { useState } from "react";

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!fullName || !email || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña tiene que ser mayor a 6 dígitos.");
      return;
    }

    // Enviar los datos
    try {
      const url = "/api/registrar"
      const response = await fetch(url, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      // Validar que devuelva datos 
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
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-neutral-950 p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <h1 className="text-4xl font-bold mb-7 text-slate-300 text-center">Registrar</h1>

        <label className="text-slate-300">Nombre:</label>
        <input
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
          type="text"
          placeholder="Santiago"
          className="border-4 border-b-black px-4 py-2 block mb-2 w-full rounded-md"
          name="fullName"
          id="fullName"
        />

        <label className="text-slate-300">Email:</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="santi@gmail.com"
          className="border-4 border-b-black px-4 py-2 block mb-2 w-full rounded-md"
          name="email"
          id="email"
        />

        <label className="text-slate-300">Contraseña:</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="*****************"
          className="border-4 border-b-black px-4 py-2 block mb-2 w-full rounded-md"
          name="password"
          id="password"
        />

        {error && (
          <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-4 rounded-md" role="alert">
            <p className="font-bold">¡Atención!</p>
            <p>{error}</p>
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 block w-full mt-4 rounded-md">
          Registrar
        </button>
        <br />
        <a href="/" className="block text-center bg-green-50 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Login
        </a>
        <br />
      </form>
    </div>
  );
}

export default Signup;
