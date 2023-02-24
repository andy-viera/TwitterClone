const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async function (email, password, cb) {
        try {
          console.log(email, password);
          const user = await User.findOne({ email });
          const passwordIngresado = password;
          const hashAlmacenado = user.password;
          const chequeoPassword = await bcrypt.compare(passwordIngresado, hashAlmacenado);

          if (!user) {
            console.log("El nombre del usuario no existe");
            return cb(null, false, { message: "Credenciales incorrectas" });
          }
          if (!chequeoPassword) {
            console.log("La contraseña no es correcta");
            return cb(null, false, { message: "Credenciales incorrectas" });
          }
          console.log("Credenciales verificadas correctamente");
          return cb(null, user);
        } catch (error) {
          cb(error);
        }
      },
    ),
  );

  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });

  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await User.findById(id);
      return cb(null, user);
    } catch (err) {
      cb(err);
    }
  });
};
