import { playlistRoutes } from "./playlist.routes";
import { userRoutes } from "./user.routes";
import express from "express";

export const routes = (app) => {
  app.use(express.json());
  userRoutes(app);
  playlistRoutes(app);
};
