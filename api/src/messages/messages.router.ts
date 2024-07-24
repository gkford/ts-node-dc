import express from "express";
import { validateAccessToken } from "../middleware/auth0.middleware";
import {
  getAdminMessage,
  getProtectedMessage,
  getPublicMessage,
} from "./messages.service";

export const messagesRouter = express.Router();

messagesRouter.get("/public", (req, res) => {
  console.log('Public message endpoint called');
  console.log('Request headers:', req.headers);
  console.log('Authorization header:', req.headers.authorization);
  
  const message = getPublicMessage();

  console.log('Sending public message:', message);
  res.status(200).json(message);
});

messagesRouter.get("/protected", validateAccessToken, (req, res) => {
  console.log('Protected message endpoint called');
  console.log('Request headers:', req.headers);
  console.log('Authorization header:', req.headers.authorization);
  
  const message = getProtectedMessage();

  console.log('Sending protected message:', message);
  res.status(200).json(message);
});

messagesRouter.get("/admin", validateAccessToken, (req, res) => {
  const message = getAdminMessage();

  res.status(200).json(message);
});
