import { create_user, get_users, login_user } from "../controllers/userController";
import { verifyUserAlreadyCreated } from "../middlewares/userAlreadyCreated";
import { validateSchema } from "../middlewares/validateSchema";
import { userSchema } from "../models/userSchema";
import { Router } from "express";

const route = Router();

export const userRoutes = (app) => {
  route.post(
    "/register",
    validateSchema(userSchema),
    verifyUserAlreadyCreated,
    create_user
  );
  
  route.post(
    "/login", 
    validateSchema(userSchema), 
    login_user
  );

  route.get("", get_users);

  app.use("/users", route);
};
