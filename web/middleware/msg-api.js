import express from "express";

import shopify from "../shopify.js";
import { MgsDB } from "../msg-db.js";



export default function applyMsgApiEndpoints(app) {
  app.use(express.json());


  app.post("/api/stMessages", async (req, res) => {
    try {
      //console.log("post");
      const { messageString, newStartDate, newEndDate } = req.body.messageSet;
      const idMsg = await MgsDB.create({ 
        messageString,
        newStartDate,
        newEndDate
      });

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(201).send(res);
    } catch (error) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(500).send(error.message);
    }
  });

  app.get("/api/stMessages", async (req, res) => {
    try {

      const response = await MgsDB.showAll(
      );
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).send(response);

    } catch (error) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(500).send(error.message);
    }
  });

  app.get("/api/stMessages/:date", async (req, res) => {
    try {
      console.log("Test validation");
      const currentDate = new date();
      const response = await MgsDB.dateValidation(req.params.date);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).send(response);
    } catch (error) { 
      res.setHeader("Access-Control-Allow-Origin", "*");  
      res.status(500).send(error.message);
    }
  });

  app.get("/api/currentMessage", async (req, res) => {
    try {
      const currentDate = new date();
      const response = await MgsDB.currentMessage(req.params.date);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).send(response);
    } catch (error) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(500).send(error.message);
    }
  });


}
