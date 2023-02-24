const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require("./models/User");

module.exports = (app) => {
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async function (username, password, cb) {
        try {
          const user = await User.findOne({ where: { email: username } });
          const passwordIngresado = req.body.password;
          const hashAlmacenado = user.password;
          const chequeoPassword = bcrypt.compare(passwordIngresado, hashAlmacenado);

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

  passport.serializeUser((user, done) => {
    console.log("[Passport] Serialize User");
    // Completar código...
  });

  passport.deserializeUser(async (id, done) => {
    console.log("[Passport] Deserialize User");
    // Completar código...
  });
};
