import { useEffect } from "react";
import { useNavigate } from "react-router";

export const Preview = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica si el token está presente en las cookies
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('access_token='));

    if (!token) {
      // Si no hay token, redirige al login
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="w-screen h-screen flex items-center justify-center m-0">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">La clase mas increible del mundo</h1>
        <h3 className="text-lg font-semibold mb-4">Bienvenido, estas listo para unirte ala clase mas increible del mundo!</h3>
        <h5 className="text-lg font-medium mb-4">Profesor: juan manuel suarez</h5>
        <div className="flex justify-center space-x-4 mb-4">
          <h5 className="text-lg">Hora de entrada: 10am</h5>
          <h5> - </h5>
          <h5 className="text-lg">Hora de salida: 12pm</h5>
        </div>
        <a href="/meet">
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">Unete ahora</button>
        </a>
      </div>
    </div>

  )
}