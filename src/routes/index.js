import express from "express";
import { userRoutes } from "./user.routes";
import { playlistRoutes } from "./playlist.routes";

export const routes = (app) => {
  app.use(express.json());
  userRoutes(app);
  playlistRoutes(app);
};
