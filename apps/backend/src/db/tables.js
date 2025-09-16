import db from './index.js';

const createTransactionTypeEnum = async () => {
  await db.query('DROP TYPE IF EXISTS transaction_type CASCADE;');
  await db.query(`
    CREATE TYPE transaction_type AS ENUM ('income', 'expense');
  `);
  console.log('Tipo ENUM transaction_type creado');
};

const createCurrencyTypeEnum = async () => {
  await db.query('DROP TYPE IF EXISTS currency_type CASCADE;');
  await db.query(`
    CREATE TYPE currency_type AS ENUM ('VES', 'USD');
  `);
  console.log('Tipo ENUM currency_type creado');
};

const createUsersTable = async () => {
  await db.query('DROP TABLE IF EXISTS users');
  await db.query(`
    CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    verify_email BOOLEAN DEFAULT false
  )
  `);
  console.log('Tabla de usuarios creada');
};

const createAccountsTable = async () => {
  await db.query('DROP TABLE IF EXISTS accounts');
  await db.query(`
    CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    currency currency_type NOT NULL,
    balance NUMERIC(15, 2) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
  )
  `);
  console.log('Tabla de cuentas creada');
};

const createTransactionsTable = async () => {
  await db.query('DROP TABLE IF EXISTS transactions');
  await db.query(`
    CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    type transaction_type NOT NULL,
    amount NUMERIC(15, 2) NOT NULL,
    account_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
    )
  `);
  console.log('Tabla de transaciones creada');
};

const createTables = async () => {
  await db.query('DROP TABLE IF EXISTS transactions CASCADE;');
  await db.query('DROP TABLE IF EXISTS accounts CASCADE;');
  await db.query('DROP TABLE IF EXISTS users CASCADE;');
  await createTransactionTypeEnum();
  await createCurrencyTypeEnum();
  console.log('Variables tipo enum creadas correctamente');
  await createUsersTable();
  await createAccountsTable();
  await createTransactionsTable();
  console.log('Tablas creadas correctamente');
};

createTables();
