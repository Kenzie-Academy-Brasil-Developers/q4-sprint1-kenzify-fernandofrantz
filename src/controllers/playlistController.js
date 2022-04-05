import jsonwebtoken from "jsonwebtoken";
import { db_users } from "../config/databases";

export const create_song = async (req, res) => {
  const data = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded_token = jsonwebtoken.decode(token);
  const user = db_users.find((user) => user.name === decoded_token.name);

  if (!req.query == false) {
    let query = req.query;
    let artist = query.artist;
    let song_obj = user.playlist;

    console.log(query);

    console.log(user.playlist.data);
  }

  user.playlist = {
    ...user.playlist,
    data,
  };

  const user_to_return = {
    uuid: user.uuid,
    name: user.name,
    playlist: user.playlist,
  };

  res.status(200).json(user_to_return);
};
