"use client";
import { useState } from "react";
// import {} from ""
export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const ingresar = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError("Por favor, complete el campos de correo.");
      return;
    }    
    if (!password) {
      setError("Por favor, complete el campos de contraseña.");
      return;
    }
    if (!email || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    
    try {
      const url = "/api/login";
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response)
      console.log(response.ok)
      if (response.ok) {
        const data = await response.json();
        console.log("Usuario encontrado:", data);
        if (data.success) {
          // Redirigir al usuario a la página de notas
          window.location.href = 'http://localhost:3000/notas';
        } else {
          setError("No se pudo iniciar sesión, intenta de nuevo.");
        }
      } else {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData.error);
        setError("Correo o contraseña incorrecto");
      }
    } catch (error) {
      console.error("Error al buscar el usuario:", error);
      setError("Error al buscar el usuario.");
    }
  };

  return (
    <>

    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Notas del punky
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={ingresar} >
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Correo
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-black hover:text-indigo-500">
                  Recuperar password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            
          </div>

            {/* Inputs de correo y contraseña */}
            {/* Manejo de errores */}
            {error && (
              <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                <p className="font-bold">¡Atención!</p>
                <p>{error}</p>
              </div>
            )}
          <div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Ingresar
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          No tienes cuenta?{' '}
          <a href="/registrar" className="font-semibold leading-6 text-black hover:text-indigo-500">
            Crear cuenta
          </a>
        </p>
      </div>
    </div>
  </>

  )
}