const sql = require("mssql");
require("dotenv").config();

const dbConfig = {
  server: process.env.DB_SERVER || "localhost",
  user: process.env.DB_USER || "your_username",
  password: process.env.DB_PASSWORD || "your_password",
  database: process.env.DB_NAME || "your_database_name",
  options: {
    trustedconnection: true,
    enableArithAbort: true,
    instancename: "SQLEXPRESS",
  },
  port: 1433,
  encrypt: false, // not good for production
  trustServerCertificate: true, // Add this line
};

// const pool = new sql.ConnectionPool(dbConfig);

// const db = async function (query: any, params = []) {
//   try {
//     await pool.connect();
//     const result = await pool.request().query(query, params);
//     return result.recordset;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
//   // Do not close the pool here
// };

const pool = new sql.ConnectionPool(dbConfig);

const db = async function (query: any, params: any) {
  try {
    await pool.connect();
    const result = await pool.request();

    // Add parameters if provided
    for (const key in params) {
      result.input(key, params[key]);
    }

    const queryResult = await result.query(query);
    return queryResult.recordset;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    // Close the pool in the finally block to ensure it's always closed
    await pool.close();
  }
};

module.exports = { db, dbConfig, sql };
