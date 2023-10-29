const jwt = require('jsonwebtoken');

const verifyToken = (request, response, next) => {
  const token = request.get('authorization'); // Get token from the header

  if (!token) {
    return response.status(401).json({ error: 'Token missing' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    request.user = decodedToken; // Add the decoded token to the request object
    next();
  } catch (error) {
    return response.status(401).json({ error: 'Token invalid' });
  }
};

module.exports = verifyToken;
