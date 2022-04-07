import {
  use
} from "bcrypt/promises";
import jsonwebtoken from "jsonwebtoken";
import {
  db_users
} from "../config/databases";

export const create_song = async (req, res) => {
  const data = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded_token = jsonwebtoken.decode(token);
  const user = db_users.find((user) => user.name === decoded_token.name);

  let user_to_return = {
    uuid: user.uuid,
    name: user.name,
    playlist: user.playlist,
  };

  if (Object.keys(req.query).length == 0) {
    user.playlist.push(data)
    res.status(200).json(user_to_return);
  }

  if (Object.keys(req.query).length == 2) {
    let {
      artist,
      song
    } = req.query;

    const newest_song = {
      artist: [{
          title: data.title,
          duration: data.duration,
          releasedDate: data.releasedDate,
          genres: [
            data.genres
          ]
        }
      ]
    }

    user.playlist.push(newest_song)

    res.status(200).json(user_to_return);
  }
};