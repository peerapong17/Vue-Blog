import bcrypt from "bcrypt";
import { User } from "../entity/User";
import * as passportGoogle from "passport-google-oauth20";
import { PassportStatic } from "passport";
import process from "./secret";

const GoogleStrategy = passportGoogle.Strategy;

export const googlePassportConfigs = (passport: PassportStatic) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.CLIENT_ID,
        clientSecret: process.CLIENT_SECRET,
        callbackURL: process.CALL_BACK_URL,
        userProfileURL: process.USER_PROFILE_URL,
      },
      async (accessToken, refreshToken, profile, cb) => {
        console.log(profile);
        const user: User = User.create({
          email: profile.id,
          username: profile.displayName ?? "No display name",
        });
        await user.save();
      }
    )
  );

  passport.serializeUser(function (user: User, done) {
    console.log("this is in serializeUser");
    done(null, user.id);
    // this user'Id is store in req.session.passport.user
  });

  passport.deserializeUser(async (id, done) => {
    console.log("this is in deserializeUser");
    const user = await User.findOneOrFail(id);
    done(null, user);
  });
};
