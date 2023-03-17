import express from "express";

import shopify from "../shopify.js";
import { MgsDB } from "../msg-db.js";



export default function applyMsgApiEndpoints(app) {
  app.use(express.json());


  app.post("/api/stMessages", async (req, res) => {
    try {
      console.log("post");
      const { messageString, newStartDate, newEndDate } = req.body.messageSet;
      const idMsg = await MgsDB.create({ 
        messageString,
        newStartDate,
        newEndDate
      });

      res.status(201).send(res);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


  app.get("/api/stMessages", async (req, res) => {
    try {
      console.log("GET01");
      const rawCodeData = await MgsDB.showAll(
      );
      console.log("GET02");
      //res.status(200).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });


}
