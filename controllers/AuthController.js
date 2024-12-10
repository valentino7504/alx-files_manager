const uuid4 = require('uuid').v4;
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');
const { atob } = require('../utils/helpers');

class AuthController {
  static async getConnect(req, res) {
    const authHeader = req.get('Authorization').slice(6);
    const decoded = atob(authHeader);
    const [email, password] = decoded.split(':');
    try {
      const id = await dbClient.validateUser(email, password);
      const token = uuid4();
      redisClient.set(`auth_${token}`, id.toString(), 24 * 60 * 60);
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  static async getDisconnect(req, res) {
    const token = req.get('X-Token');
    const id = await redisClient.get(`auth_${token}`);
    if (!id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    redisClient.del(`auth_${token}`);
    return res.status(204).end();
  }
}

module.exports = AuthController;
