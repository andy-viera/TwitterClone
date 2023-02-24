const User = require("../models/User");
const formidable = require("formidable");
const bcrypt = require("bcryptjs");
const flash = require("express-flash");

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
      await User.create({
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

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
async function showFollowers(req, res) {
  const id = req.params.id;
  const userFollowers = await User.findById(id).populate("followers");
  res.render("pages/followers", { userFollowers });
}

async function showFollowing(req, res) {
  const id = req.params.id;
  const userFollowing = await User.findById(id).populate("following");
  res.render("pages/following", { userFollowing });
}

module.exports = {
  register,
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
  showFollowers,
  showFollowing,
};
