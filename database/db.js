/* eslint-disable object-curly-newline */
/* eslint-disable no-console */

import { config } from 'dotenv';
import mysql from 'mysql2';

config();

var pool = mysql.createConnection(process.env.DATABASE_URL);

const client = pool.promise();

const userTable = `CREATE TABLE IF NOT EXISTS
            users(
              id SERIAL PRIMARY KEY UNIQUE,
              email VARCHAR(128) NOT NULL UNIQUE,
              firstName VARCHAR(128) NOT NULL,
              lastName VARCHAR(128) NOT NULL,
              password VARCHAR(128) NOT NULL,
              type VARCHAR(128) NOT NULL,
              isAdmin VARCHAR(128) NOT NULL,
              phoneNumber VARCHAR(128) NOT NULL
            );`;

const accountTable = `CREATE TABLE IF NOT EXISTS
              accounts(
                accountNumber INT PRIMARY KEY UNIQUE,
                userid INT REFERENCES users (id),
                createdOn Date NOT NULL,
                type VARCHAR(128) NOT NULL,
                status VARCHAR(128) NOT NULL,
                balance FLOAT NOT NULL
              );`;

const transactionTable = `CREATE TABLE IF NOT EXISTS
                    transactions(
                      id SERIAL PRIMARY KEY UNIQUE,
                      accountNumber INT REFERENCES accounts (accountNumber),
                      createdOn VARCHAR(128) NOT NULL,
                      type VARCHAR(128) NOT NULL,
                      cashier INT NOT NULL,
                      amount FLOAT NOT NULL,
                      oldBalance FLOAT NOT NULL,
                      newBalance FLOAT NOT NULL
                    );`;

function initDBPool() {
  try {
    pool.query(userTable, function (err, results, fields) {
      console.log(results); // fields contains extra meta data about results, if available
    });

    pool.query(accountTable, function (err, results, fields) {
      console.log(results); // results contains rows returned by server
    });

    pool.query(transactionTable, function (err, results, fields) {
      console.log(results); // results contains rows returned by server
    });

    console.log('Tables created successfully');
  } catch (err) {

    console.log('Unable to create tables: ', err);
  }
}
function dropTables() {
  const query1 = 'TRUNCATE transactions CASCADE';
  const query2 = 'TRUNCATE accounts CASCADE';
  const query3 = 'TRUNCATE users CASCADE';
  try {
    pool.query(query1);
    pool.query(query2);
    pool.query(query3);
  } catch (error) {
    console.log(error);
  }
}

export { initDBPool, client, dropTables };
