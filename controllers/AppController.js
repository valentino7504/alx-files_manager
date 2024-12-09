const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

class AppController {
  static getStatus(request, response) {
    const redisStatus = redisClient.isAlive();
    const dbStatus = dbClient.isAlive();
    return response.status(200).send({ redis: redisStatus, db: dbStatus });
  }

  static async getStats(request, response) {
    const nbUsers = await dbClient.nbUsers();
    const nbFiles = await dbClient.nbFiles();
    return response.status(200).send({ users: nbUsers, files: nbFiles });
  }
}

module.exports = AppController;
