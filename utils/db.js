const { MongoClient } = require('mongodb');
const { hashPwd } = require('./helpers');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const URL = `mongodb://${DB_HOST}:${DB_PORT}`;

class DBClient {
  constructor() {
    this.db = null;
    this.connected = false;
    this.client = new MongoClient(URL, { useUnifiedTopology: true });
    this.initialize();
  }

  async initialize() {
    try {
      await this.client.connect();
      this.db = this.client.db(DB_DATABASE);
      this.connected = true;
    } catch (error) {
      console.log(error.message);
    }
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    if (!this.db) return 0;
    try {
      return await this.db.collection('users').countDocuments();
    } catch (error) {
      console.log(error.message);
      return 0;
    }
  }

  async nbFiles() {
    if (!this.db) return 0;
    try {
      return await this.db.collection('files').countDocuments();
    } catch (err) {
      console.log(err.message);
      return 0;
    }
  }

  async userExists(email) {
    const user = await this.db.collection('users').findOne({ email });
    if (!user) return false;
    return true;
  }

  async createUser(email, password) {
    if (!email) {
      throw new Error('Missing email');
    }
    if (!password) {
      throw new Error('Missing password');
    }
    const exists = await this.userExists(email);
    if (exists) {
      throw new Error('Already exists');
    }
    const hashedPwd = hashPwd(password);
    try {
      const { insertedId } = await this.db.collection('users').insertOne({ email, password: hashedPwd });
      const insertedDocument = await this.db.collection('users').findOne({ _id: insertedId });
      return { id: insertedId, email: insertedDocument.email };
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
