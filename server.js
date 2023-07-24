const express = require('express');
const oracledb = require('oracledb');

// These lines should be placed at the top of this file so the db config get loaded
require('dotenv').config();

const dbConfig = {
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASS,
    connectString: `${process.env.ORACLE_HOST}:${process.env.ORACLE_PORT}/${process.env.ORACLE_DBNAME}`
};

const app = express();
const PORT = 65535;

app.use(express.static('public'));


async function testOracleConnection() {
    let connection;
  
    try {
      connection = await oracledb.getConnection(dbConfig);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  async function fetchUserFromDb() {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('SELECT * FROM USER');
        return result.rows;
    } catch (err) {
        console.error(err);
        return [];
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}


app.get('/check-db-connection', async (req, res) => {
  const isConnect = await testOracleConnection();

  if (isConnect) {
    res.send('connected');
  } else {
    res.send('unable to connect');
  }
});

app.get('/users', async (req, res) => {
  const users = await fetchUserFromDb();
  res.json(users);
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

