
export const signUpUser = async (formData) => {
  try {
    
    const response = await fetch("http://localhost:3000/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Error en el registro.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error; // Lanza el error para que pueda ser manejado donde se invoque
  }
};

export const loger = async (email, password) => {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("Credenciales incorrectas o error en el servidor");
    }

    return await response.json(); // Retorna la respuesta si es exitosa
  } catch (error) {
    console.error("Error en login:", error); // Esto te ayudará a entender qué falla
    throw error; // Lanza el error para que sea manejado en el componente
  }
};
