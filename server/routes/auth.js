const router = require("express").Router();
const passport = require("passport");
const path = require('path');
const rasta = path.join(__dirname,'./config.env');
require('dotenv').config({ path: rasta });

router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	}),
    async (req, res) => {
        try {
            res.redirect(`${process.env.CLIENT_URL}`);
        }
        catch (err) { console.log(err); res.send("some problem occured") }
    }
);

router.get("/logout", (req, res) => {
	req.logout(function (err) {
        if (err) {
            return res.back();
        }
        else {            
            res.redirect(process.env.CLIENT_URL);            
        }
    })
});

module.exports = router;