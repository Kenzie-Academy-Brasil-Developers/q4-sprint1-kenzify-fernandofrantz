import { db_users } from "../config/databases";
import jsonwebtoken from "jsonwebtoken";
import { validateSchema } from "../middlewares/validateSchema";
import { playlistSchema } from "../models/playlistSchema";

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
    let { artist, song } = req.query;

    if ( 
      data.title === undefined || 
      data.duration === undefined ||
      data.releasedDate === undefined ||
      data.genres === undefined 
      ) {
        return res.status(400).json({ required_fields: "title, duration, releasedDate, genres" })
    }

    const newest_song = {
      title: data.title,
      duration: data.duration,
      releasedDate: data.releasedDate,
      genres: data.genres
    }

    user.playlist[0][artist].push(newest_song)

    res.status(200).json(user_to_return);
  }
};

export const delete_song = async (req, res) => {
  let { artist, song_name } = req.query;
  const token = req.headers.authorization.split(" ")[1];
  const decoded_token = jsonwebtoken.decode(token);
  const user = db_users.find((user) => user.name === decoded_token.name);
 
  user.playlist[0][artist] = user.playlist[0][artist].filter((song) => song.title != song_name);

  res.status(204).json("");
}