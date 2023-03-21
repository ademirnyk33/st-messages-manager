/*
  This file interacts with the app's database and is used by the app's REST APIs.
*/

import sqlite3 from "sqlite3";
import path from "path";
import shopify from "./shopify.js";

const DEFAULT_DB_FILE = path.join(process.cwd(), "msg_db.sqlite");


export const MgsDB = {
  msgTableName: "messages",
  db: null,
  ready: null,

  create: async function ({
    messageString,
    newStartDate,
    newEndDate,
  }) {
    try {
    await this.ready;
    //console.log("INSERT");
    const query = `
      INSERT INTO ${this.msgTableName}
      (message
        , active
        , startDate
        , endDate)
      VALUES ( '${messageString}'
        , 1
        , '${newStartDate}'
        , '${newEndDate}')
      RETURNING idMsg;
    `;
    //console.log(query);
    //console.log(messageString);
    const rawResults = await this.__query(query, []);
    //console.log(rawResults);
    return rawResults[0].id;
      } catch (error){
        console.error(error);
      }
  },

  update: async function (
    idMsg,
    {
      message,
      active,
    }
  ) {
    await this.ready;

    const query = `
      UPDATE ${this.msgTableName}
      SET
        message=?,
        active=1,
        
      WHERE
        idMsg = ?;
    `;

    await this.__query(query, [
      idMsg,
      message,
      active,
    ]);
    return true;
  },

  read: async function (id) {
    await this.ready;
    const query = `
      SELECT * FROM ${this.msgTableName}
      WHERE idMsg = ?;
    `;
    const rows = await this.__query(query, [id]);
    if (!Array.isArray(rows) || rows?.length !== 1) return undefined;

    return this.__addImageUrl(rows[0]);
  },

  dateValidation: async function (date) {
    console.log("Validation");
    console.log(date);
    await this.ready;
    const query = `
      SELECT startDate FROM ${this.msgTableName}
      WHERE '${date}' BETWEEN startDate AND endDate;
    `;
    console.log(query);
    const rows = await this.__query(query, []);
    //if (!Array.isArray(rows) || rows?.length !== 1) return undefined;

    return rows;
  },

  delete: async function (id) {
    await this.ready;
    const query = `
      DELETE FROM ${this.msgTableName}
      WHERE idMsg = ?;
    `;
    await this.__query(query, [id]);
    return true;
  },

  showAll: async function () {
    await this.ready;
    //console.log("Show All");
    const query = `
      SELECT * FROM ${this.msgTableName};
    `;
    const rows = await this.__query(query, []);
    //console.log(rows);
    //if (!Array.isArray(rows) || rows?.length !== 1) return undefined;

    return rows;
  },

  __hasMsgsTable: async function () {
    const query = `
      SELECT name FROM sqlite_schema
      WHERE
        type = 'messages' AND
        name = ?;
    `;
    const rows = await this.__query(query, [this.qrCodesTableName]);
    return rows.length === 1;
  },


  init: async function () {

    /* Initializes the connection to the database */
    this.db = this.db ?? new sqlite3.Database(DEFAULT_DB_FILE);
    //console.log(this.db);
    const hasMsgsTable = await this.__hasMsgsTable();

    if (hasMsgsTable) {
      this.ready = Promise.resolve();

      /* Create the QR code table if it hasn't been created */
    } else {
      const query = `
        CREATE TABLE ${this.msgTableName} (
          idMsg INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          message VARCHAR(511) NOT NULL,
          active INTEGER,
          startDate DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
          endDate DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime'))
        )
      `;

      /* Tell the various CRUD methods that they can execute */
      this.ready = this.__query(query);
    }
  },


  /* Perform a query on the database. Used by the various CRUD methods. */
  __query: function (sql, params = []) {
    //console.log("__query");
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, result) => {
        //console.log(result);
        if (err) {
          
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  },
};


