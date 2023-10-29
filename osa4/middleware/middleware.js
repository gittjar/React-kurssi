const jwt = require('jsonwebtoken');

const verifyToken = (request, response, next) => {
  const token = request.get('authorization'); // Get token from the header
  console.log('Received Token:', token);
  if (!token) {
    return response.status(401).json({ error: 'Token missing' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log('Decoded Token:', decodedToken);

    // Lisää dekoodattu token request-objektiin
    request.user = decodedToken;

    next();
  } catch (error) {
    console.error('Token Verification Error:', error);
    return response.status(401).json({ error: 'Token invalid' });
  }
};

module.exports = verifyToken;
