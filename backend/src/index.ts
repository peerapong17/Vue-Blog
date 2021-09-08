import { Comment } from './entity/Comment';
import "reflect-metadata";
import { User } from "./entity/User";
import { createConnection } from "typeorm";
import { Blog } from "./entity/Blog";
import { passportConfigs } from "./configs/passport";
import { jwtConfigs } from "./configs/jwt";
import { userRoute, blogRoute, commentRoute } from './route';
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
  password: "",
  database: "App",
  entities: [Blog, User, Comment],
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
    origin: "http://localhost:8080", // <-- location of the angular app were connecting to
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

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS");  
//   next();
// });

app.use("/comment", commentRoute)

app.use("/blog", blogRoute);

app.use("/user", userRoute);
