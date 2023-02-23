const { mongoose, Schema } = require("../db");

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  biography: String,
  image: String,
  tweetlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
