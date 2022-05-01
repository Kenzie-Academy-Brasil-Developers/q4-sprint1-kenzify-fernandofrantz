import { routes } from "./routes";
import express from "express";

const app = express();

routes(app);

export default app;
