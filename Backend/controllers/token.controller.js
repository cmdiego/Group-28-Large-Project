const jwt = require('jsonwebtoken');


exports.authenticateToken = async(req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader;
  if(token == null)
    return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if(err)
      return res.sendStatus(403);
    req.user = user;
    next();
  });
}
