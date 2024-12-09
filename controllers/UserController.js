const dbClient = require('../utils/db');

class UserController {
  static async createUser(req, res) {
    const { email, password } = req.body;
    try {
      const user = await dbClient.createUser(email, password);
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = UserController;
