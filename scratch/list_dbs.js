const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Read .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const match = line.match(/^\s*([^#=\s]+)\s*=\s*(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      process.env[key] = val;
    }
  });
}

const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
  console.log('Connecting to MongoDB cluster...');
  const client = await mongoose.connect(MONGODB_URI);
  console.log('Connected!');

  const adminDb = mongoose.connection.client.db().admin();
  const dbs = await adminDb.listDatabases();
  console.log('Databases on Cluster:');
  
  for (const dbInfo of dbs.databases) {
    const dbName = dbInfo.name;
    const db = mongoose.connection.client.db(dbName);
    const collections = await db.listCollections().toArray();
    console.log(`Database: ${dbName}`);
    
    for (const coll of collections) {
      if (coll.name === 'toeicquestions') {
        const count = await db.collection('toeicquestions').countDocuments({});
        console.log(`  Collection: ${coll.name} -> Count: ${count}`);
        
        // Let's sample a question and print its blockId
        const sample = await db.collection('toeicquestions').findOne({});
        console.log(`    Sample question blockId: ${sample ? sample.blockId : 'none'}, part: ${sample ? sample.part : 'none'}`);
      }
    }
  }
  
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
