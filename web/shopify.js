import { LATEST_API_VERSION } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-01";
import sqlite3 from "sqlite3";
import { join } from "path";
import { MgsDB } from "./msg-db.js";

const database = new sqlite3.Database(join(process.cwd(), "msg_db.sqlite"));
const sessionDb = new SQLiteSessionStorage(database);

MgsDB.db = database;
MgsDB.init();

const shopify = shopifyApp({
  api: {
    apiVersion: LATEST_API_VERSION,
    restResources,
    billing: undefined, // or replace with billingConfig above to enable example billing
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },
  // This should be replaced with your preferred storage strategy
  sessionStorage: sessionDb,
});

export default shopify;
