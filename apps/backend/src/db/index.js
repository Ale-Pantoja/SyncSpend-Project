import pg from 'pg';

const { Pool } = pg;

const connectionString =
  process.env.NODE_ENV === 'development' ? process.env.DATABASE_DEV_URL : process.env.DATABASE_URL;

const pool = new Pool({ connectionString });

const getClient = async () => {
  return await pool.connect();
};

export default {
  query: (text, params) => pool.query(text, params),
  getClient,
};
