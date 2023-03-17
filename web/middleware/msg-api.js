import express from "express";

import shopify from "../shopify.js";
import { MgsDB } from "../msg-db.js";



export default function applyMsgApiEndpoints(app) {
  app.use(express.json());


  app.post("/api/stMessages", async (req, res) => {
    try {

      const { messageString } = req.body.messageSet;
      const idMsg = await MgsDB.create({ messageString,
        
      });
      //console.log(idMsg);

      res.status(201).send(res);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


  app.get("/api/stMessages", async (req, res) => {
    try {
      const rawCodeData = await MgsDB.list(

      );
      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });


}
