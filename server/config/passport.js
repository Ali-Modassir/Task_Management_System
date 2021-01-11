const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const user = require("../models/User");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

//passport template code
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await user.User.findOne({
          "google.id": profile.id,
        });

        if (existingUser) {
          return done(null, existingUser);
        }

        const localExistingUser = await user.User.findOneAndUpdate(
          {
            "local.email": profile.emails[0].value,
          },
          {
            $set: {
              google: {
                id: profile.id,
                email: profile.emails[0].value,
                token: accessToken,
              },
            },
          },
          { returnOriginal: false }
        );

        if (localExistingUser) {
          return done(null, localExistingUser);
        }

        const newUser = new user.User({
          method: "google",
          local: {
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "not set",
            confirmed: true,
          },
          google: {
            id: profile.id,
            email: profile.emails[0].value,
            token: accessToken,
          },
        });
        await newUser.save();
        done(null, newUser);
      } catch (err) {
        console.log(err.message);
        done(err, false, err.message);
      }
    }
  )
);
