const User = require("../models/User");
const Tweet = require("../models/Tweet");
const formidable = require("formidable");
const bcrypt = require("bcryptjs");

function register(req, res) {
  res.render("pages/register", { flash: req.flash() });
}

async function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const { firstname, lastname, email, username, password } = fields;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      req.flash("error", "You are already registered!");
      res.redirect("/register");
    } else {
      const user = await User.create({
        firstname,
        lastname,
        email,
        username,
        image: files.image.newFilename,
        password: await bcrypt.hash(password, 10),
      });
      req.login(user, () => res.redirect("/"));
    }
  });
}

async function like(req, res) {
  const tweetId = req.params.tweetid;
  const loggedUserId = req.user._id;
  const tweet = await Tweet.findById(tweetId);
  const likes = tweet.likes;
  const likeIndex = likes.indexOf(loggedUserId);
  if (likeIndex === -1) {
    // loggedUserId is not in the likes array, so add it
    likes.push(loggedUserId);
  } else {
    // loggedUserId is in the likes array, so remove it
    likes.splice(likeIndex, 1);
  }
  await tweet.save();
  res.redirect(req.headers.referer || "/");
}

async function follow(req, res) {
  const userId = req.params.userid;
  const loggedUserId = req.user._id;
  const user = await User.findById(userId);
  const followers = user.followers;
  const following = req.user.following;
  const followerIndex = followers.indexOf(loggedUserId);
  const followingIndex = following.indexOf(userId);

  if (followerIndex === -1) {
    followers.push(loggedUserId);
    following.push(userId);
  } else {
    followers.splice(followerIndex, 1);
    following.splice(followingIndex, 1);
  }
  await user.save();
  await req.user.save();

  res.redirect(req.headers.referer || "/");
}

async function showFollowers(req, res) {
  const username = req.params.username;
  const userFollowers = await User.findOne({ username }).populate("followers");
  res.render("pages/followers", { userFollowers });
}

async function showFollowing(req, res) {
  const username = req.params.username;
  const userFollowing = await User.findOne({ username }).populate("following");
  res.render("pages/following", { userFollowing });
}

module.exports = {
  register,
  store,
  like,
  follow,
  showFollowers,
  showFollowing,
};
