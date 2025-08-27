import { atom } from "nanostores";
import { createNotification } from "../notifications/notificiation.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";
const BASE_URL = `${BACK_ENDPOINT}/api/transactions`;


/** 
  * @typedef Transaction
  * @type {object}
  * @property {string} id El id de la transaccion
  * @property {string} description El nombre de la transaccion
  * @property {string} date La fecha de la transaccion
  * @property {string} type El tipo de la transaccion
  * @property {string} amount El monto de la transaccion
  * @property {number} accountId La cuenta utilizada de la transaccion
*/

/** @type {Transaction[]} */
let transactionsArray = [];
export const transactions = atom(transactionsArray);


/** 
  * Agrega una transaccion
  * @param {object} transactionToCreate La nuevo transaccion
  * @param {string} transactionToCreate.description La descripcion de la transaccion
  * @param {string} transactionToCreate.date La fecha de la transaccion
  * @param {string} transactionToCreate.type El saldo de la transaccion
  * @param {string} transactionToCreate.amount El monto de la transaccion
  * @param {number} transactionToCreate.accountId La cuenta utilizada de la transaccion
*/
const addTransaction = async (transactionToCreate) => {
  try {
    const transactionCreated = await ky.post(BASE_URL, {json: transactionToCreate, credentials: 'include'}).json();
    transactions.set(transactions.get().concat(transactionCreated));
    createNotification({title: 'Transaccion creada!',type: 'success'});
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
  * Elimina una transaccion
  * @param {string} id El id de la transaccion a eliminar
*/
const removeTransaction = async (id) => {
  const url = `${BASE_URL}/${id}`;
  try {
    const transactionDeleted = await ky.delete(url, { credentials: 'include'}).json();
    transactions.set(transactions.get().filter(transaction => transaction.id !== transactionDeleted.id));
    createNotification({
      title: 'Transaccion eliminada',
      description: `${transactionDeleted.name}`,
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
 * Actualiza una transaccion
 * @param {Transaction} transactionToUpdate
*/
const updateTransaction = async (transactionToUpdate) => {
  const url = `${BASE_URL}/${transactionToUpdate.id}`;
  try {
    const transaccionUpdated = await ky.put(url, {json: transactionToUpdate, credentials: 'include'}).json();
    transactions.set(transactions.get().map(transaction => {
      if (transaction.id === transaccionUpdated.id) {
        return transaccionUpdated;
      } else {
        return transaction;
      }
    }));
     createNotification({
      title: 'transaccion actualizada',
      description: `${transaccionUpdated.description}`,
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

const getTransaction = async () => {
  try {
    const transactionsData = await ky.get(`${BACK_ENDPOINT}/api/transactions`, {
      credentials: 'include'
    }).json()
    transactions.set(transactionsData);
  } catch (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      location.replace('/login');
    }
    console.log(error);
  }
}

export default {
  addTransaction,
  removeTransaction,
  updateTransaction,
  getTransaction
}