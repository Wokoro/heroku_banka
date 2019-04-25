/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
import pg from 'pg';

const config = {
  user: process.env.DB_USER || 'postgres', // this is the db user credential
  database: process.env.DB_NAME || 'banka',
  password: process.env.DB_PASSWORD || 'samsizzy199',
  max: process.env.DB_MAX || 10, // max number of clients in the pool
  idleTimeoutMillis: process.env.DB_IDLETIMEOUTMILLIS || 30000,
};

const pool = new pg.Pool(config);

const client = pool;

const userTable = `CREATE TABLE IF NOT EXISTS
            users(
              id SERIAL PRIMARY KEY UNIQUE,
              email VARCHAR(128) NOT NULL UNIQUE,
              firstName VARCHAR(128) NOT NULL,
              lastName VARCHAR(128) NOT NULL,
              password VARCHAR(128) NOT NULL,
              type VARCHAR(128) NOT NULL,
              isAdmin VARCHAR(128) NOT NULL,
              phoneNumber INT NOT NULL
            );`;

const accountTable = `CREATE TABLE IF NOT EXISTS
              accounts(
                accountNumber INTEGER PRIMARY KEY UNIQUE,
                userid INT REFERENCES users (id),
                createdOn Date NOT NULL,
                type VARCHAR(128) NOT NULL,
                status VARCHAR(128) NOT NULL,
                balance VARCHAR(128) NOT NULL
              );`;

const transactionTable = `CREATE TABLE IF NOT EXISTS
                    transactions(
                      id SERIAL PRIMARY KEY UNIQUE,
                      accountNumber INTEGER REFERENCES accounts (accountNumber),
                      createdOn VARCHAR(128) NOT NULL,
                      type VARCHAR(128) NOT NULL,
                      cashier INT NOT NULL,
                      amount INT NOT NULL,
                      oldBalance INT NOT NULL,
                      newBalance INT NOT NULL
                    );`;

async function initDBPool() {
  try {
    await pool.query(userTable);
    await pool.query(accountTable);
    await pool.query(transactionTable);
  } catch (err) {
    console.log(err);
  }
}
async function dropTables() {
  const query1 = 'TRUNCATE transactions';
  const query2 = 'TRUNCATE accounts';
  const query3 = 'TRUNCATE users';
  try {
    await pool.query(query1);
    await pool.query(query2);
    await pool.query(query3);
  } catch (error) {
    console.log(error);
  }
}


export { initDBPool, client, dropTables };
