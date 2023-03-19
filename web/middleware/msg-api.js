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
      //console.log("GET01");
      const response = await MgsDB.showAll(
      );
      //console.log(rawCodeData);
      res.status(200).send(response);

    } catch (error) {
      //console.error(error);
      res.status(500).send(error.message);
    }
  });

  app.get("/api/stMessages/:date", async (req, res) => {
    try {
      const response = await MgsDB.dateValidation(req.params.date);
      console.log(`El resultado es: ${response}`);
      res.sendStatus(200).body.send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });


}
