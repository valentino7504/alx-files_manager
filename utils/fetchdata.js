const redisClient = require('./redis');
const dbClient = require('./db');

const fetchUser = async (req) => {
  const token = req.get('X-Token');
  const id = await redisClient.get(`auth_${token}`);
  if (!id) {
    throw new Error('Unauthorized');
  }
  const userDetails = await dbClient.getUserById(id);
  return userDetails;
};

module.exports = {
  fetchUser,
};
