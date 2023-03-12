/*
  This file interacts with the app's database and is used by the app's REST APIs.
*/

import sqlite3 from "sqlite3";
import path from "path";
import shopify from "./shopify.js";

const DEFAULT_DB_FILE = path.join(process.cwd(), "msg_db.sqlite");
const DEFAULT_PURCHASE_QUANTITY = 1;

export const MgsDB = {
  msgTableName: "messages",
  db: null,
  ready: null,

  create: async function ({
    message,
    active,
  }) {
    await this.ready;

    const query = `
      INSERT INTO ${this.msgTableName}
      (message
        , active)
      VALUES (?
        , 1)
      RETURNING id;
    `;

    const rawResults = await this.__query(query, [
      message,
      active,
    ]);

    return rawResults[0].id;
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

  list: async function (shopDomain) {
    await this.ready;
    const query = `
      SELECT * FROM ${this.msgTableName}
      WHERE active = 1;
    `;

    const results = await this.__query(query, [shopDomain]);

    return results.map((qrcode) => this.__addImageUrl(qrcode));
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

  delete: async function (id) {
    await this.ready;
    const query = `
      DELETE FROM ${this.msgTableName}
      WHERE idMsg = ?;
    `;
    await this.__query(query, [id]);
    return true;
  },

  /* The destination URL for a QR code is generated at query time */
 /*  generateQrcodeDestinationUrl: function (qrcode) {
    return `${shopify.api.config.hostScheme}://${shopify.api.config.hostName}/qrcodes/${qrcode.id}/scan`;
  }, */

  /* The behavior when a QR code is scanned */
  // handleCodeScan: async function (qrcode) {

  //   /* Log the scan in the database */
  //   await this.__increaseScanCount(qrcode);

  //   const url = new URL(qrcode.shopDomain);
  //   switch (qrcode.destination) {

  //     /* The QR code redirects to the product view */
  //     case "product":
  //       return this.__goToProductView(url, qrcode);

  //     /* The QR code redirects to checkout */
  //     case "checkout":
  //       return this.__goToProductCheckout(url, qrcode);

  //     default:
  //       throw `Unrecognized destination "${qrcode.destination}"`;
  //   }
  // },

  /* Private */

  /*
    Used to check whether to create the database.
    Also used to make sure the database and table are set up before the server starts.
  */


  /* Initializes the connection with the app's sqlite3 database */
  init: async function () {

    /* Initializes the connection to the database */
    this.db = this.db ?? new sqlite3.Database(DEFAULT_DB_FILE);

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
          createdAt DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime'))
        )
      `;

      /* Tell the various CRUD methods that they can execute */
      this.ready = this.__query(query);
    }
  },

  
  /* Perform a query on the database. Used by the various CRUD methods. */
  __query: function (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  },



  /**************OJO ***********/
/*   __increaseScanCount: async function (qrcode) {
    const query = `
      UPDATE ${this.msgTableName}
      SET scans = scans + 1
      WHERE id = ?
    `;
    await this.__query(query, [qrcode.id]);
  }, */

 /*  __goToProductView: function (url, qrcode) {
    return productViewURL({
      discountCode: qrcode.discountCode,
      host: url.toString(),
      productHandle: qrcode.handle,
    });
  },

  __goToProductCheckout: function (url, qrcode) {
    return productCheckoutURL({
      discountCode: qrcode.discountCode,
      host: url.toString(),
      variantId: qrcode.variantId,
      quantity: DEFAULT_PURCHASE_QUANTITY,
    });
  }, */
};

/* Generate the URL to a product page */
// function productViewURL({ host, productHandle, discountCode }) {
//   const url = new URL(host);
//   const productPath = `/products/${productHandle}`;

//   /* If this QR Code has a discount code, then add it to the URL */
//   if (discountCode) {
//     url.pathname = `/discount/${discountCode}`;
//     url.searchParams.append("redirect", productPath);
//   } else {
//     url.pathname = productPath;
//   }

//   return url.toString();
// }

/* Generate the URL to checkout with the product in the cart */
/********** OJO **************/
// function productCheckoutURL({ host, variantId, quantity = 1, discountCode }) {
//   const url = new URL(host);
//   const id = variantId.replace(
//     /gid:\/\/shopify\/ProductVariant\/([0-9]+)/,
//     "$1"
//   );

//   /* The cart URL resolves to a checkout URL */
//   url.pathname = `/cart/${id}:${quantity}`;

//   if (discountCode) {
//     url.searchParams.append("discount", discountCode);
//   }

//   return url.toString();
// }
