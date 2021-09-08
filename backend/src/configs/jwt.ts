import { PassportStatic } from 'passport';
import passportJWT from "passport-jwt";
import { User } from "../entity/User";
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export const jwtConfigs = (passport: PassportStatic) =>
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: "A little secrets",
      },
      async (jwtPayload: { id: string }, done) => {
        const user = await User.findOne(jwtPayload.id);
        if (user) {
          return done(null, { id: user.id, username: user.username });
        } else {
          return done(null, false);
        }
      }
    )
  );
