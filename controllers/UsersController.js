const dbClient = require('../utils/db');
const { fetchUser } = require('../utils/fetchdata');

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
    try {
      const userDetails = await fetchUser(req);
      return res.status(200).json(userDetails);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

module.exports = UsersController;
