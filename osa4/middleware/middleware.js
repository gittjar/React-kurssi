// middleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (request, response, next) => {
  const token = request.get('authorization'); // Ota token otsakkeesta

  if (!token) {
    return response.status(401).json({ error: 'Token missing' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    request.user = decodedToken; // Lisää dekoodattu token request-objektiin
    next();
  } catch (error) {
    return response.status(401).json({ error: 'Token invalid' });
  }
};

module.exports = verifyToken;
