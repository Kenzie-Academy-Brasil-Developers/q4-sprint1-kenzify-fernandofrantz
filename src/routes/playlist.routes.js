import { create_song, delete_song } from "../controllers/playlistController";
import { Router } from "express";

const playlistRoute = Router();

export const playlistRoutes = (app) => {
  playlistRoute.put("", create_song);
  playlistRoute.delete("", delete_song)

  app.use("/users/playlist", playlistRoute);
};
