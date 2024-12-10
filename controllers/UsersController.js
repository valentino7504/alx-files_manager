const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    try {
      const user = await dbClient.createUser(email, password);
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async getMe(req, res) {
    const token = req.get('X-Token');
    const id = await redisClient.get(`auth_${token}`);
    if (!id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const userDetails = await dbClient.getUserById(id);
    return res.status(200).json(userDetails);
  }
}

module.exports = UsersController;
