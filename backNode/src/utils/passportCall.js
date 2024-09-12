import passport from 'passport';

const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(200).json({ error: info?.message || info?.toString() || 'Authentication failed' });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

export default passportCall;
