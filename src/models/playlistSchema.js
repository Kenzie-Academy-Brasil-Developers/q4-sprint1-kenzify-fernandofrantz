import * as yup from "yup";

export const playlistSchema = yup.object().shape({
  title: yup.string("Invalid title").required("required field"),
  duration: yup.string("Invalid dutation").required("required field"),
  releasedDate: yup.string("Invalid released date").required("required field"),
  genres: yup.string("Invalid genre").required("required field"),
});
