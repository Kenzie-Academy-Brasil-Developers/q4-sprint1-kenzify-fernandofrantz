import { Router } from "express";
import { userSchema } from "../models/userSchema";
import { create_user, login_user } from "../controllers/userController";
import { validateSchema } from "../middlewares/validateSchema";
import { verifyUserAlreadyCreated } from "../middlewares/userAlreadyCreated";

const route = Router();

export const userRoutes = (app) => {
  route.post(
    "/register",
    validateSchema(userSchema),
    verifyUserAlreadyCreated,
    create_user
  );
  route.post("/login", login_user);

  app.use("/users", route);
};
