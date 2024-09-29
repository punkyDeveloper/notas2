"use client";
import { useState } from "react";

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
      const url = "/api/registrar";
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
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/';
        }, 3000); // Redirige después de 3 segundos
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
      </form>
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">¡Registro exitoso!</h2>
            <p className="mb-4">Redirigiendo a la plataforma...</p>
            <button
              onClick={() => (window.location.href = '/')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Ir ahora
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
