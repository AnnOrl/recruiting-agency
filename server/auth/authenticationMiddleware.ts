import HttpStatus from 'http-status-codes';

const authenticationMiddleware = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.status(HttpStatus.UNAUTHORIZED).send({
			error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)
		});
	}
	next();
};

const redirectMiddleware = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.redirect('/login');
	}
	next();
};

export { authenticationMiddleware, redirectMiddleware };
