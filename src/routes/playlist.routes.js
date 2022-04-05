import { Router } from "express";
import { playlistSchema } from "../models/playlistSchema";
import { validateSchema } from "../middlewares/validateSchema";
import { create_song } from "../controllers/playlistController";
import { verifyUserAlreadyCreated } from "../middlewares/userAlreadyCreated";

const playlistRoute = Router();

export const playlistRoutes = (app) => {
  playlistRoute.put("", create_song);

  app.use("/users/playlist", playlistRoute);
};
