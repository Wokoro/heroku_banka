import pg from 'pg';

const config = {
  user: 'postgres', // this is the db user credential
  database: 'banka',
  password: 'samsizzy199',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};

const Client = new pg.Pool(config);

const createTables = {
  userTable: `CREATE TABLE IF NOT EXISTS
            users(
              id SERIAL PRIMARY KEY UNIQUE,
              email VARCHAR(128) NOT NULL UNIQUE,
              firstName VARCHAR(128) NOT NULL,
              lastName VARCHAR(128) NOT NULL,
              password VARCHAR(128) NOT NULL,
              type VARCHAR(128) NOT NULL,
              isAdmin VARCHAR(128) NOT NULL,
              phoneNumber INTEGER NOT NULL
            )`,

  accountTable: `CREATE TABLE IF NOT EXISTS
              accounts(
                accountNumber INTEGER PRIMARY KEY UNIQUE,
                id INTEGER REFERENCES users (id),
                createdOn Date NOT NULL,
                owner INTEGER NOT NULL,
                type VARCHAR(128) NOT NULL,
                balance VARCHAR(128) NOT NULL
              )`,

  transactionTable: `CREATE TABLE IF NOT EXISTS
                    transactions(
                      accountNumber INTEGER REFERENCES accounts (accountNumber),
                      createdOn VARCHAR(128) NOT NULL,
                      type VARCHAR(128) NOT NULL,
                      cashier VARCHAR(128) NOT NULL,
                      amount INTEGER NOT NULL,
                      oldBalance INTEGER NOT NULL,
                      newBalance INTEGER NOT NULL
                    )`,

  tableIndexes: `CREATE INDEX user_index ON users (email);
                  CREATE UNIQUE INDEX accounts_index ON accounts (id, accountNumber);
                  CREATE INDEX transac_indx ON transactions (cashier)
                 `,
};

async function initDBClient() {
  const {
    userTable, accountTable, transactionTable, tableIndexes,
  } = createTables;

  Client.connect();

  try {
    await Client.query(userTable);
    await Client.query(accountTable);
    await Client.query(transactionTable);
    await Client.query(tableIndexes);
  } catch (err) {
    console.log(err);
  } finally {
    Client.end();
  }
}

Client.on('connect', () => {
  console.log('connected to database');
});

export { initDBClient, Client };
