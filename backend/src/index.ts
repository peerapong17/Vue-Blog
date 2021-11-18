import { Comment } from "./entity/Comment";
import "reflect-metadata";
import { User } from "./entity/User";
import { createConnection } from "typeorm";
import { Blog } from "./entity/Blog";
import { Token } from "./entity/Token";
import { passportConfigs } from "./configs/passport";
import { jwtConfigs } from "./configs/jwt";
import { googlePassportConfigs } from "./configs/google";
import { userRoute, blogRoute, commentRoute, googleRoute, resetPasswordRoute } from "./route";
import express from "express";
import cors from "cors";
import path from "path";
import passport from "passport";
import session from "express-session";

const app = express();

createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "peerapong123",
  database: "App",
  entities: [Blog, User, Comment, Token],
  synchronize: true,
})
  .then(async (connection) => {
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((error) => console.log(error));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:8081", // <-- location of the angular app were connecting to
    credentials: true,
  })
);
app.use("/images", express.static(path.join(process.cwd() + "/images")));

app.use(
  session({
    secret: "Our little secret.",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize()); //<--- please note that this middleware should come first

app.use(passport.session());

jwtConfigs(passport);

passportConfigs(passport);

googlePassportConfigs(passport);

app.use("/comment", commentRoute);

app.use("/blog", blogRoute);

app.use("/user", userRoute);

app.use("/auth/google", googleRoute);

app.use("/reset-password", resetPasswordRoute);
