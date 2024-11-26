import React, { useState } from "react";
import { loger } from "../gateway/auth";
import { useNavigate } from "react-router";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!email || !password) {
      alert("Por favor ingresa tu correo y contraseña.");
      return;
    }
    try {
      const data = await loger(email,password);

      navigate("/")
    }catch(error){
      alert('hubo un problema la hacer login')
    }

    setEmail("");
    setPassword("");
  };

  return (
    <section className="h-screen bg-neutral-200 flex items-center justify-center">
      <div className="container h-full p-10 flex items-center justify-center">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="./yeti.png"
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        Bienvenido!
                      </h4>
                    </div>

                    {/* Formulario con onSubmit para manejar el envío */}
                    <form id="form" onSubmit={handleSubmit}>
                      <p className="mb-4">Por favor ingresa tus datos</p>

                      <input
                        className="w-full p-3 m-2"
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Maneja el estado del email
                        required
                      />
                      <input
                        className="w-full p-3 m-2"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Maneja el estado de la contraseña
                        required
                      />
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          type="submit"
                          style={{
                            background: "linear-gradient(to right, #5c9bf1, #00aaff)", // Gradiente azul más claro
                          }}
                        >
                          Entrar
                        </button>
                        <a href="#!">Olvidaste tu contraseña?</a>
                      </div>

                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">¿No tienes una cuenta?</p>
                        <button
                          type="button"
                          className="inline-block rounded border-2 border-blue-500 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-blue-500 transition duration-150 ease-in-out hover:border-blue-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-blue-600 focus:border-blue-600 focus:text-blue-600 focus:outline-none focus:ring-0 active:border-blue-700 active:text-blue-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                          <a href="/signup">Regístrate</a>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Columna derecha con fondo de gradiente y texto */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background: "linear-gradient(to right, #5c9bf1, #00aaff)", // Gradiente azul más claro
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      Somos más que una escuela
                    </h4>
                    <p className="text-sm">
                      Somos la nueva forma de aprender, ¡embárcate en una nueva experiencia de conocimientos y diversión!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
