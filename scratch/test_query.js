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
const MONGODB_DB = process.env.MONGODB_DB || 'toeic_vocabulary';

const ToeicQuestionSchema = new mongoose.Schema({
  part: Number,
  category: String,
  passage: String,
  questionText: String,
  choices: [String],
  correctAnswer: String,
  explanation: String,
  blockId: String,
  sourcePdf: String
}, { collection: 'toeicquestions' });

const ToeicQuestion = mongoose.models.ToeicQuestion || mongoose.model('ToeicQuestion', ToeicQuestionSchema);

async function test() {
  console.log('Connecting to', MONGODB_DB, '...');
  await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB });
  console.log('Connected!');

  const total = await ToeicQuestion.countDocuments({});
  console.log('Total questions in DB:', total);

  const part6Total = await ToeicQuestion.countDocuments({ part: 6 });
  console.log('Part 6 questions in DB:', part6Total);

  const sample6 = await ToeicQuestion.findOne({ part: 6 });
  console.log('Sample Part 6:', sample6);

  const sampledBlocks = await ToeicQuestion.aggregate([
    { $match: { part: 6, blockId: { $ne: null, $ne: "" } } },
    { $group: { _id: "$blockId" } },
    { $sample: { size: 1 } }
  ]);
  console.log('Sampled Blocks:', sampledBlocks);

  if (sampledBlocks.length > 0) {
    const blockId = sampledBlocks[0]._id;
    const questions = await ToeicQuestion.find({ part: 6, blockId: blockId });
    console.log(`Questions for block ${blockId} (Count: ${questions.length}):`);
    questions.forEach((q, idx) => {
      console.log(`  [${idx + 1}] Text: ${q.questionText.substring(0, 60)}...`);
    });
  }

  process.exit(0);
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});
