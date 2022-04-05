import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { db_users } from "../config/databases";

export const config = {
  secret: "the_greatest_secret_key",
  expiresIn: "604800",
};

export const create_user = async (req, res) => {
  const hashed_password = await bcrypt.hash(req.body.password, 10);

  const user = {
    uuid: uuidv4(),
    name: req.body.name,
    password: hashed_password,
    playlist: [],
  };

  const user_to_return = {
    playlist: {},
    name: req.body.name,
    uuid: uuidv4(),
  };

  db_users.push(user);

  res.status(201).json(user_to_return);
};

export const login_user = async (req, res) => {
  const { name, password } = req.body;

  const find_user = db_users.find((user) => user.name === name);

  if (!find_user) {
    return res.status(401).json({
      message: "Wrong credentials. Try again!",
    });
  }

  const match = bcrypt.compare(password, find_user.password);

  if (!match) {
    return res.status(401).json({
      message: "Wrong credentials. Try again!",
    });
  }

  let token = jwt.sign(
    {
      name: name,
    },
    config.secret,
    {
      expiresIn: config.expiresIn,
    }
  );

  res.status(200).json({ accessToken: token });
};
