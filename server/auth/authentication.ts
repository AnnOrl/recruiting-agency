import { authenticationMiddleware, redirectMiddleware } from './authenticationMiddleware';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Users } from '../entity/Users';

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

const initPassport = (connection) => {
	passport.use(
		new Strategy(
			{
				usernameField: 'username',
				passwordField: 'password'
			},
			async (username, password, done) => {
				try {
					const user = await connection.getRepository(Users).findOne({ login: username });
					if (!user) {
						console.log('User not found');
						return done(null, false);
					}
					// Always use hashed passwords and fixed time comparison
					bcrypt.compare(password, user.passwordHash, (err, isValid) => {
						if (err) {
							return done(err);
						}
						if (!isValid) {
							return done(null, false);
						}
						passport.user = user;
						return done(null, user);
					});
				} catch (e) {
					return done(e);
				}
			}
		)
	);

	passport.authenticationMiddleware = authenticationMiddleware;
	passport.redirectMiddleware = redirectMiddleware;
};

export { initPassport };
