import pg from 'pg';

const { Pool } = pg;

const connectionString =
  process.env.NODE_ENV === 'dev' ? process.env.DATABASE_DEV_URL : process.env.DATABASE_URL;

const pool = new Pool({ connectionString });

const getClient = async () => {
  return await pool.connect();
};

pool.on('connect', () => {
  console.log('Conexión con la base de datos establecida.');
});

export default {
  query: (text, params) => pool.query(text, params),
  getClient,
};