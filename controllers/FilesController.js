const dbClient = require('../utils/db');
const { fetchUser } = require('../utils/fetchdata');

class FilesController {
  static async postUpload(req, res) {
    const { id } = await fetchUser(req);
    const userId = id;
    let {
      parentId, isPublic,
    } = req.body;
    const { name, type, data } = req.body;
    parentId = parentId || 0;
    isPublic = isPublic || false;
    try {
      const newFile = await dbClient.createFile(name, type, parentId, isPublic, data, userId);
      return res.status(201).json(newFile);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = FilesController;
