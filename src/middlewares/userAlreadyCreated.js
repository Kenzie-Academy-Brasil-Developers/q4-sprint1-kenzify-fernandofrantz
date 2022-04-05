import { db_users } from "../config/databases";

export const verifyUserAlreadyCreated = (req, res, next) => {
  const verify_user = db_users.filter((user) => user.name === req.body.name);

  if (verify_user.length === 0) {
    return next();
  }
  return res.status(422).json({
    message: "You can not use this username.",
  });
};
