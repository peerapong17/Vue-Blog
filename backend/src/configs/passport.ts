import bcrypt from "bcrypt";
import { User } from "../entity/User";
import * as passportLocal from "passport-local";
import { PassportStatic } from "passport";

const LocalStrategy = passportLocal.Strategy;

export const passportConfigs = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      console.log("this is in LocalStrategy");
      const user = await User.findOne({ email: username });
      

      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }

      bcrypt.compare(password, user.password, (req, res) => {
        if (res == true) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password" });
        }
      });
    })
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
