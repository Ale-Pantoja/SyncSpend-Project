import { atom } from "nanostores";
import { createNotification } from "../notifications/notificiation.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";
const BASE_URL = `${BACK_ENDPOINT}/api/accounts`;


/** 
  * @typedef Account
  * @type {object}
  * @property {string} id El id de la cuenta
  * @property {string} name El nombre de la cuenta
  * @property {string} currency La moneda de la cuenta
  * @property {number} balance El numero de la cuenta
*/

/** @type {Account[]} */
let accountsArray = [];
export const accounts = atom(accountsArray);


/** 
  * Agrega una cuenta.
  * @param {object} accountToCreate La nuevo cuenta
  * @param {string} accountToCreate.name La moneda de la cuenta
  * @param {string} accountToCreate.currency La moneda de la cuenta
  * @param {number} accountToCreate.balance El saldo de la cuenta
*/
const addAccount = async (accountToCreate) => {
  try {
    const accountCreated = await ky.post(BASE_URL, {json: accountToCreate, credentials: 'include'}).json();
    accounts.set(accounts.get().concat(accountCreated));
    createNotification({title: 'Cuenta creada!',type: 'success'});
  } catch (error) {
    console.log(error);
    const errorData = await error.response.json();
    createNotification({
      title: 'Ups! Hubo un error',
      description: errorData.error,
      type: 'error'
    });
  }
};


/**
  * Elimina una cuenta
  * @param {string} id El id de la cuenta a eliminar
*/
const removeAccount = async (id) => {
  const url = `${BASE_URL}/${id}`;
  try {
    const accountDeleted = await ky.delete(url, { credentials: 'include'}).json();
    accounts.set(accounts.get().filter(account => account.id !== accountDeleted.id));
    createNotification({
      title: 'Cuenta eliminada',
      description: `${accountDeleted.name}`,
      type: 'success'
    });
  } catch (error) {
    console.log(error);
    const errorData = await error.response.json();
    createNotification({
      title: 'Ups! Hubo un error',
      description: errorData.error,
      type: 'error'
    });
  }
}

/**
 * Actualiza una cuenta
 * @param {Account} accountToUpdate
 */
const updateAccount = async (accountToUpdate) => {
  const url = `${BASE_URL}/${accountToUpdate.id}`;
  const payload = {};

  if (accountToUpdate.name !== undefined) {
    payload.name = accountToUpdate.name;
  }
  if (accountToUpdate.balance !== undefined) {
    payload.balance = accountToUpdate.balance;
  }
  if (accountToUpdate.is_active !== undefined) {
    payload.is_active = accountToUpdate.is_active;
  }

  try {
    const accountUpdated = await ky.put(url, { json: payload, credentials: 'include' }).json();
    accounts.set(accounts.get().map(account => {
      if (account.id === accountUpdated.id) {
        return accountUpdated;
      } else {
        return account;
      }
    }));
    createNotification({
      title: 'Cuenta actualizada',
      description: ``,
      type: 'success'
    });
  } catch (error) {
    console.log(error);
    const errorData = await error.response.json();
    createNotification({
      title: 'Ups! Hubo un error',
      description: errorData.error,
      type: 'error'
    });
  }
}

const getAccount = async () => {
  try {
    const accountsData = await ky.get(`${BACK_ENDPOINT}/api/accounts`, { credentials: 'include' }).json();
    accounts.set(accountsData);
  } catch (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      location.replace('/login');
    }
    console.log(error);
  }
};

export default {
  addAccount,
  removeAccount,
  updateAccount,
  getAccount
}