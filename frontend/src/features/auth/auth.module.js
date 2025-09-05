import ky from "ky";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import { atom } from "nanostores";

export const user = atom(null);

const login = async ({email, password}) => {
  const response = await ky.post(`${BACK_ENDPOINT}/api/auth/login`, {
    json: {email, password},
    credentials: 'include'
  });
  const data = await response.json(); // leer el cuerpo JSON
  user.set(data);      
}

const getLoggedUser = async () => {
  const data = await ky.get(`${BACK_ENDPOINT}/api/auth/user`, {credentials: 'include'}).json();
  user.set(data);
  console.log('esta es la data: ',data);
  return data;
}

const logoutUser = async () => {
  await ky.get(`${BACK_ENDPOINT}/api/auth/logout`, {credentials: 'include'});
}

const AuthModule = { login, getLoggedUser, logoutUser };
export default AuthModule; 