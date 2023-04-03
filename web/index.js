// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";

import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";
import applyMsgApiEndpoints from "./middleware/msg-api.js";

/************************ POSTPURCHASE ********************************* */
import cors from "cors";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { MgsDB } from "./msg-db.js";
import { responsePathAsArray } from "graphql";


/************************ POSTPURCHASE ********************************* */

export { MgsDB } from "./msg-db.js";


const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);


app.use(express.json());

/********************** POSTPURCHASE ********************* */

app.post("/api/offer", cors(), async (req, res) => {
  try {

    jwt.verify(req.body.token, process.env.SHOPIFY_API_SECRET);
  } catch (e) {
    res.status(401).send("Unauthorized");
  }
  const payload = await MgsDB.currentMessage(); //getOffers();
  res.json(JSON.stringify({currentMessage: payload}));
});


app.post("/api/sign-changeset", cors(), async (req, res) => {
  try {
    jwt.verify(req.body.token, process.env.SHOPIFY_API_SECRET);
  } catch (e) {
    res.status(401).send("Unauthorized");
  }

  const selectedOffer = getSelectedOffer();
  console.log("changeset");
  const payload = {
    iss: process.env.SHOPIFY_API_KEY,
    jti: uuidv4(),
    iat: Date.now(),
    sub: req.body.referenceId,
    changes: selectedOffer.changes,
  };

  const token = jwt.sign(payload, process.env.SHOPIFY_API_SECRET);
  res.status(200).send(JSON.stringify({token}));
});

/********************** POSTPURCHASE ********************* */

app.use("/api/*", shopify.validateAuthenticatedSession());



applyMsgApiEndpoints(app);


app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
