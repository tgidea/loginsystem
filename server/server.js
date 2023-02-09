require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const session = require("express-session");
const passportStrategy = require("./passport");
const app = express();

// app.use(
// 	cookieSession({
// 		name: "session",
// 		keys: ["cyberwolve"],
// 		maxAge: 24 * 60 * 60 * 100,
//         resave : false,
// 	})
// );
app.use(session({
    name : 'session',
    cookie : {
        maxAge : 72*60*60*1000,
    },
    secret : [`${process.env.SESSIONKEY}`],
    resave : false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));