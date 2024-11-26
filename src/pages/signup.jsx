import React, { useState } from "react";
import { signUpUser } from "../gateway/auth";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    age: "",
  });
  const navigate = useNavigate();

  const { email, password, firstName, lastName, age } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !firstName || !lastName || !age) {
      alert("Por favor ingresa todos los campos.");
      return;
    }

    try {
      const data = await signUpUser(formData); 
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        age: "",
      });

      alert("Cuenta creada con éxito");

      navigate('/login');

    } catch (error) {
      alert("Hubo un problema al crear tu cuenta. Inténtalo de nuevo.");
    }
  };

  return (
    <section className="h-screen bg-neutral-200 flex items-center justify-center">
      <div className="container h-full p-10 flex items-center justify-center">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background: "linear-gradient(to right, #5c9bf1, #00aaff)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      Atrévete a una nueva experiencia
                    </h4>
                    <p className="text-sm">
                      Inscríbete a la mejor oportunidad de aprendizaje que la vida te puede brindar
                    </p>
                  </div>
                </div>
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        Crea una cuenta
                      </h4>
                    </div>

                    <form id="form" onSubmit={handleSubmit}>

                      <div className="mb-4">
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Edad</label>
                        <input
                          id="age"
                          name="age"
                          className="w-full sm:w-32 p-3 m-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                          type="number"
                          value={age}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="mb-4">
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Primer Nombre</label>
                          <input
                            id="firstName"
                            name="firstName"
                            className="w-full p-3 m-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                            type="text"
                            value={firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Apellidos</label>
                          <input
                            id="lastName"
                            name="lastName"
                            className="w-full p-3 m-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                            type="text"
                            value={lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                        <input
                          id="email"
                          name="email"
                          className="w-full p-3 m-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                          type="email"
                          value={email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                          id="password"
                          name="password"
                          className="w-full p-3 m-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                          type="password"
                          value={password}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="mt-8 mb-8 pb-1 pt-1 text-center">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          type="submit"
                          style={{
                            background: "linear-gradient(to right, #5c9bf1, #00aaff)",
                          }}
                        >
                          Crear cuenta
                        </button>
                      </div>
                    </form>
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
