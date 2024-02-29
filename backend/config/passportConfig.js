import User from "../models/userModel.js";
import passport from "passport";
import LocalStrategy from "passport-local";

passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		async (username, password, done) => {
			try {
				const user = await User.findOne({ email: username });
				if (!user) {
					return done(null, false, { message: "Incorrect email or password" });
				}
				if (user & (await !user.checkPassword(password, user.password))) {
					return done(null, false, { message: "Incorrect email or password" });
				}
				return done(null, user);
			} catch (err) {
				return done(err);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, {
			_id: user._id,
			name: user.name,
			email: user.email,
			profilePic: user.profilePic,
		});
	} catch (err) {
		done(err);
	}
});

export default passport;
