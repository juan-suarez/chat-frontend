import { jwtDecode } from 'jwt-decode';

export default function getUserInfoFromCookie() {
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('access_token='));

  
  if (!cookie) {
    return { firstName : "pepito", lastName: "perez"};
  }

  const token = cookie.split('=')[1];
  try {
    const decoded = jwtDecode(token);
    console.log(decoded)

    const firstName = decoded.first_name; 
    const lastName = decoded.last_name;   

    return { firstName, lastName };
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
}
  
