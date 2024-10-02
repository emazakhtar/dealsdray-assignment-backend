require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const employeeRouter = require("./routes/Employee");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const { isAuth, sanitizeUser, cookieExtractor } = require("./services/common");
const { User } = require("./models/User");
const path = require("path");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

// connecting to database...
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("database connected");
}

// SH AND JSON PARSING MW
app.use(express.static(path.resolve(__dirname, "build")));
app.use(express.json());
// for file upload
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
    origin: ["http://localhost:3001", "http://localhost:8080"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());

// routes .....
app.use("/employee", isAuth(), employeeRouter.router);
app.use("/user", isAuth(), userRouter.router);
app.use("/auth", authRouter.router);
app.get("*", (req, res) => res.sendFile(path.resolve("build", "index.html")));

// jwt Strategy...

let opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET;

// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      console.log("jwt called");
      return done(null, sanitizeUser(user));
    } catch (err) {
      return done(err);
    }
  })
);

// Login Strategy...
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "username",
    },
    async (username, password, done) => {
      try {
        // Find the user by username
        console.log("jkjj");
        const user = await User.findOne({ username });

        // If user doesn't exist
        console.log("jkjj");
        if (!user) {
          return done(null, false, { message: "Invalid credentials" });
        }
        console.log(user.password, password);
        if (user.password !== password) {
          return done(null, false, { message: "Invalid credentials" });
        }

        console.log("login successful");
        done(null, sanitizeUser(user)); // this line sends the user to serializer
      } catch (error) {
        return done(error);
      }
    }
  )
);

app.listen(process.env.PORT, () => {
  console.log("server started at port" + process.env.PORT);
});
