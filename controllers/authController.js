const passport = require("passport");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

async function showLogin(req, res) {
  res.render("./pages/login");
}

const login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

const logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    console.log("logout successfull");
    res.redirect("/login");
  });
};

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
  showLogin,
  login,
  logout,
};
