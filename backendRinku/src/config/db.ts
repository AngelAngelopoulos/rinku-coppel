/**
 * @file sequelize.ts
 * @description This file contains the configuration for Sequelize, an ORM for Node.js, used to connect to a SQL Server database.
 * @module sequelize
 */

import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @constant sequelize
 * @description The Sequelize instance used to connect to the SQL Server database.
 * @type {Sequelize}
 */
export const sequelizeConnection = new Sequelize(
  process.env.DATABASE_NAME ?? '',
  process.env.DATABASE_USER ?? '',
  process.env.DATABASE_PASSWORD ?? '',
  {
    dialect: 'mssql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    dialectOptions: {
      options: {
        trustedConnection: true,
        encrypt: true,
      },
    },
  },
);

/**
 * @function authenticate
 * @description Authenticates the connection to the SQL Server database.
 * @returns {Promise<void>}
 */
(async () => {
  try {
    await sequelizeConnection.authenticate();
    console.log('Connected to MSSQL Database.');
  } catch (error) {
    console.error('Cannot connect to database. Error: ', error);
  }
})();
