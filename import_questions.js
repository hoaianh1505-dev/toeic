const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Define mongoose schema inline to avoid module path issues
const ToeicQuestionSchema = new mongoose.Schema({
  part: { type: Number, required: true, min: 1, max: 7 },
  category: { type: String, required: true, enum: ['Grammar', 'Vocabulary', 'Listening', 'Reading'] },
  passage: { type: String },
  imageUrl: { type: String },
  audioUrl: { type: String },
  questionText: { type: String, required: true },
  choices: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true, enum: ['A', 'B', 'C', 'D'] },
  explanation: { type: String }
}, {
  timestamps: true
});

const ToeicQuestion = mongoose.models.ToeicQuestion || mongoose.model('ToeicQuestion', ToeicQuestionSchema);

const pdfDir = path.join(__dirname, 'pdf');

// Read .env.local manually
const envPath = path.join(__dirname, '.env.local');
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

if (!MONGODB_URI) {
  console.error('MONGODB_URI not found in .env.local');
  process.exit(1);
}

function cleanVietnameseSpacing(text) {
  return text.trim();
}

async function parsePdfFile(pdfjs, filePath) {
  console.log(`Parsing file: ${path.basename(filePath)}...`);
  const dataBuffer = fs.readFileSync(filePath);
  const uint8Data = new Uint8Array(dataBuffer);
  
  const loadingTask = pdfjs.getDocument({ data: uint8Data });
  const pdfDoc = await loadingTask.promise;
  const numPages = pdfDoc.numPages;
  
  const ops = pdfjs.OPS || {};
  const opNames = {};
  for (const key of Object.keys(ops)) {
    opNames[ops[key]] = key;
  }
  
  const pageTexts = [];
  const pageAnswersList = [];
  
  // Pass 1: Extract text and answer boxes for each page
  for (let pNum = 1; pNum <= numPages; pNum++) {
    try {
      const page = await pdfDoc.getPage(pNum);
      const textContent = await page.getTextContent();
      
      // Sort text items
      const textItems = textContent.items.map(item => ({
        str: item.str,
        x: item.transform[4],
        y: item.transform[5],
        width: item.width || 0
      }));
      textItems.sort((a, b) => {
        if (Math.abs(a.y - b.y) > 5) return b.y - a.y;
        return a.x - b.x;
      });
      
      // Reconstruct text
      let text = '';
      let currentY = null;
      let lastX = null;
      let lastWidth = null;
      for (const item of textItems) {
        if (currentY === null) {
          currentY = item.y;
          text += item.str;
        } else if (Math.abs(item.y - currentY) > 5) {
          currentY = item.y;
          text += '\n' + item.str;
        } else {
          const gap = item.x - (lastX + lastWidth);
          text += (gap > 3 ? ' ' : '') + item.str;
        }
        lastX = item.x;
        lastWidth = item.width;
      }
      
      pageTexts.push(text);
      
      // Find constructPath boxes & check colors
      const opList = await page.getOperatorList();
      let currentFillColor = '#000000';
      const rawBoxes = [];
      
      for (let i = 0; i < opList.fnArray.length; i++) {
        const fn = opList.fnArray[i];
        const args = opList.argsArray[i];
        const name = opNames[fn] || fn;
        
        if (name === 'setFillRGBColor') {
          currentFillColor = args[0];
        } else if (name === 'constructPath') {
          const coords = args[2];
          if (coords) {
            const x1 = coords[0] !== undefined ? coords[0] : coords["0"];
            const y1 = coords[1] !== undefined ? coords[1] : coords["1"];
            const x2 = coords[2] !== undefined ? coords[2] : coords["2"];
            const y2 = coords[3] !== undefined ? coords[3] : coords["3"];
            const width = Math.abs(x2 - x1);
            const height = Math.abs(y2 - y1);
            
            if (width > 600 && width < 700 && height >= 44 && height <= 48) {
              rawBoxes.push({
                y: Math.min(y1, y2),
                height,
                isGreen: (currentFillColor === '#00b184')
              });
            }
          }
        }
      }
      
      // Deduplicate choice boxes
      const uniqueBoxes = [];
      for (const box of rawBoxes) {
        let existing = uniqueBoxes.find(b => Math.abs(b.y - box.y) < 3);
        if (existing) {
          if (box.isGreen) existing.isGreen = true;
        } else {
          uniqueBoxes.push(box);
        }
      }
      uniqueBoxes.sort((a, b) => a.y - b.y);
      
      // Cluster boxes into groups of 4
      const groups = [];
      for (const box of uniqueBoxes) {
        let placed = false;
        for (const g of groups) {
          if (g.length < 4 && Math.abs(box.y - g[g.length - 1].y) < 100) {
            g.push(box);
            placed = true;
            break;
          }
        }
        if (!placed) {
          groups.push([box]);
        }
      }
      
      const pageAnswers = [];
      groups.forEach(g => {
        g.sort((a, b) => a.y - b.y);
        const greenIdx = g.findIndex(b => b.isGreen);
        if (greenIdx !== -1) {
          const letter = String.fromCharCode(65 + greenIdx);
          pageAnswers.push({
            avgY: g.reduce((sum, b) => sum + b.y, 0) / g.length,
            answer: letter
          });
        }
      });
      pageAnswers.sort((a, b) => a.avgY - b.avgY);
      
      pageAnswersList.push(pageAnswers);
      
    } catch (pageErr) {
      console.error(`Error parsing page ${pNum}:`, pageErr.message);
      pageTexts.push('');
      pageAnswersList.push([]);
    }
  }
  
  const parsedQuestions = [];
  
  // Pass 2: Parse questions page-by-page, aligning answers on the same page
  for (let pNum = 1; pNum <= numPages; pNum++) {
    const text = pageTexts[pNum - 1];
    const pageAnswers = pageAnswersList[pNum - 1];
    
    const passageHeaderRegex = /Câu\s+(\d+)\s*-\s*(\d+)/i;
    const passageMatch = passageHeaderRegex.exec(text);
    
    if (passageMatch) {
      const startQ = parseInt(passageMatch[1]);
      const endQ = parseInt(passageMatch[2]);
      
      // Find position of the first question, e.g. "150."
      let firstQPos = text.indexOf(startQ.toString() + ".", passageMatch.index + passageMatch[0].length);
      if (firstQPos === -1) {
        firstQPos = text.indexOf(startQ.toString() + " ", passageMatch.index + passageMatch[0].length);
      }
      if (firstQPos === -1) {
        firstQPos = text.indexOf(startQ.toString(), passageMatch.index + passageMatch[0].length);
      }
      
      // Extract passage
      const rawPassage = firstQPos !== -1 
        ? text.substring(passageMatch.index + passageMatch[0].length, firstQPos)
        : '';
      const passageText = cleanVietnameseSpacing(rawPassage.trim());
      
      const part = (startQ >= 147) ? 7 : 6;
      const category = 'Reading';
      
      // Loop through each question number in the block
      for (let q = startQ; q <= endQ; q++) {
        let qStart = text.indexOf(q.toString() + ".", passageMatch.index);
        if (qStart === -1) {
          qStart = text.indexOf(q.toString() + " ", passageMatch.index);
        }
        if (qStart === -1) {
          qStart = text.indexOf(q.toString(), passageMatch.index);
        }
        
        if (qStart !== -1) {
          let nextQStart = -1;
          if (q < endQ) {
            nextQStart = text.indexOf((q + 1).toString() + ".", qStart + 2);
            if (nextQStart === -1) {
              nextQStart = text.indexOf((q + 1).toString() + " ", qStart + 2);
            }
            if (nextQStart === -1) {
              nextQStart = text.indexOf((q + 1).toString(), qStart + 2);
            }
          }
          
          let qContent = nextQStart !== -1 
            ? text.substring(qStart, nextQStart)
            : text.substring(qStart);
            
          // Look ahead to next page if it's the last question in the block
          if (q === endQ && pNum < numPages) {
            const nextPageText = pageTexts[pNum];
            if (nextPageText) {
              qContent += '\n' + nextPageText;
            }
          }
          
          // Map to correct answer in pageAnswers
          const ansIdx = q - startQ;
          const ansObj = pageAnswers[ansIdx];
          
          if (ansObj) {
            // Parse choices
            const choices = [];
            const choiceARegex = /\(A\)\s*([^\n]+)/i;
            const choiceBRegex = /\(B\)\s*([^\n]+)/i;
            const choiceCRegex = /\(C\)\s*([^\n]+)/i;
            const choiceDRegex = /\(D\)\s*([^\n]+)/i;
            
            const matchA = choiceARegex.exec(qContent);
            const matchB = choiceBRegex.exec(qContent);
            const matchC = choiceCRegex.exec(qContent);
            const matchD = choiceDRegex.exec(qContent);
            
            if (matchA) choices.push('(A) ' + matchA[1].trim());
            if (matchB) choices.push('(B) ' + matchB[1].trim());
            if (matchC) choices.push('(C) ' + matchC[1].trim());
            if (matchD) choices.push('(D) ' + matchD[1].trim());
            
            if (choices.length < 4) {
              choices.length = 0;
              choices.push('(A) Option A', '(B) Option B', '(C) Option C', '(D) Option D');
            }
            
            // Parse prompt
            let prompt = qContent.split(/\(A\)/i)[0].replace(new RegExp('^' + q + '\\s*\\.?\\s*', 'i'), '').trim();
            prompt = cleanVietnameseSpacing(prompt);
            
            // Parse explanation
            let explanation = '';
            const explRegex = /Giải\s*thích:\s*([\s\S]+)/i;
            const explMatch = explRegex.exec(qContent);
            if (explMatch) {
              explanation = cleanVietnameseSpacing(explMatch[1].trim());
            } else {
              explanation = 'Xem tài liệu đi kèm để biết chi tiết.';
            }
            
            parsedQuestions.push({
              part,
              category,
              questionText: prompt || 'Select the correct choice.',
              choices,
              correctAnswer: ansObj.answer,
              explanation,
              passage: passageText,
              blockId: filePath + "_" + pNum
            });
          }
        }
      }
    } else {
      // Part 5: Standalone questions
      const questionRegex = /Câu\s+(\d+)/gi;
      const questionMatches = [];
      let match;
      while ((match = questionRegex.exec(text)) !== null) {
        const qNum = parseInt(match[1]);
        if (qNum >= 101) {
          questionMatches.push({
            qNum,
            index: match.index
          });
        }
      }
      questionMatches.sort((a, b) => a.index - b.index);
      
      questionMatches.forEach((q, idx) => {
        const nextQ = questionMatches[idx + 1];
        let qContent = text.substring(q.index, nextQ ? nextQ.index : text.length);
        
        if (!nextQ && pNum < numPages) {
          const nextPageText = pageTexts[pNum];
          if (nextPageText) {
            qContent += '\n' + nextPageText;
          }
        }
        
        const ansObj = pageAnswers[idx];
        if (ansObj) {
          // Parse choices
          const choices = [];
          const choiceARegex = /\(A\)\s*([^\n]+)/i;
          const choiceBRegex = /\(B\)\s*([^\n]+)/i;
          const choiceCRegex = /\(C\)\s*([^\n]+)/i;
          const choiceDRegex = /\(D\)\s*([^\n]+)/i;
          
          const matchA = choiceARegex.exec(qContent);
          const matchB = choiceBRegex.exec(qContent);
          const matchC = choiceCRegex.exec(qContent);
          const matchD = choiceDRegex.exec(qContent);
          
          if (matchA) choices.push('(A) ' + matchA[1].trim());
          if (matchB) choices.push('(B) ' + matchB[1].trim());
          if (matchC) choices.push('(C) ' + matchC[1].trim());
          if (matchD) choices.push('(D) ' + matchD[1].trim());
          
          if (choices.length < 4) {
            choices.length = 0;
            choices.push('(A) Option A', '(B) Option B', '(C) Option C', '(D) Option D');
          }
          
          let prompt = qContent.split(/\(A\)/i)[0].replace(/Câu\s+\d+\s*/i, '').trim();
          prompt = cleanVietnameseSpacing(prompt);
          
          let explanation = '';
          const explRegex = /Giải\s*thích:\s*([\s\S]+)/i;
          const explMatch = explRegex.exec(qContent);
          if (explMatch) {
            explanation = cleanVietnameseSpacing(explMatch[1].trim());
          } else {
            explanation = 'Xem tài liệu đi kèm để biết chi tiết.';
          }
          
          parsedQuestions.push({
            part: 5,
            category: 'Grammar',
            questionText: prompt || 'Select the correct choice.',
            choices,
            correctAnswer: ansObj.answer,
            explanation,
            blockId: filePath + "_" + pNum
          });
        }
      });
    }
  }
  
  return parsedQuestions;
}

async function main() {
  try {
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
    
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB });
    console.log('Connected to MongoDB!');
    
    // Find PDF files to parse (match all DA1.pdf to DA20.pdf)
    const files = fs.readdirSync(pdfDir)
      .filter(f => /^DA\d+\.pdf$/.test(f))
      // Sort them numerically so they are processed in order
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)[0]);
        const numB = parseInt(b.match(/\d+/)[0]);
        return numA - numB;
      });
      
    const filesToParse = files;
    console.log(`Will parse all ${filesToParse.length} files:`, filesToParse);
    
    let totalImported = 0;
    const allParsedQuestions = [];
    // Clear existing collection
    await ToeicQuestion.deleteMany({});
    console.log('Cleared existing ToeicQuestion collection.');
    
    for (const file of filesToParse) {
      try {
        const filePath = path.join(pdfDir, file);
        const questions = await parsePdfFile(pdfjs, filePath);
        
        if (questions.length > 0) {
          // Tag questions with source file name
          questions.forEach(q => {
            q.sourcePdf = file;
          });
          allParsedQuestions.push(...questions);
          await ToeicQuestion.insertMany(questions);
          totalImported += questions.length;
          console.log(`Successfully imported ${questions.length} questions from ${file}`);
        } else {
          console.log(`No questions imported from ${file}`);
        }
      } catch (fileErr) {
        console.error(`❌ Error parsing file ${file}:`, fileErr.message);
      }
    }
    
    // Save to local JSON file
    const jsonPath = path.join(__dirname, 'pdf_questions.json');
    fs.writeFileSync(jsonPath, JSON.stringify(allParsedQuestions, null, 2), 'utf8');
    console.log(`Saved parsed questions to local JSON: ${jsonPath}`);
    
    console.log(`\n🎉 DONE! Imported a total of ${totalImported} questions for Part 5, 6, 7.`);
    process.exit(0);
  } catch (err) {
    console.error('Fatal error:', err);
    process.exit(1);
  }
}

main();
