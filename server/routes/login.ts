import passport from 'passport';
import HttpStatus from 'http-status-codes';

const initLogin = (app) => {
	app.post('/api/login', function(req, res, next) {
		passport.authenticate('local', function(error, user, info) {
			if (error) {
				return res.status(HttpStatus.UNAUTHORIZED).send({
					error
				});
			}
			if (!user) {
				return res.status(HttpStatus.UNAUTHORIZED).send({
					error: 'Пользователь не найдет, возможно неверно введен логин или пароль'
				});
			}

			return req.logIn(user, (err) => {
				if (err) {
					return res.status(HttpStatus.UNAUTHORIZED).send({
						error: err
					});
				}
				res.status(HttpStatus.OK).send();
				return next();
			});
		})(req, res, next);
	});

	app.get('/api/logout', function(req, res, next) {
		req.logout();
		res.status(HttpStatus.OK).send();
		return next();
	});
};

export { initLogin };
