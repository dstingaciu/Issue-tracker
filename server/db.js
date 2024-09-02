const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectDB() {
  console.log("Initializing Mongo connection...")
  await client.connect();
  console.log('Connected to Mongo');
  return client.db('issueTracker');
}

module.exports = { connectDB };