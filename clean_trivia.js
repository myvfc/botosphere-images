const fs = require("fs");

const inputFile = process.argv[2];
const outputFile = process.argv[3] || "trivia.json";

if (!inputFile) {
  console.error("❌ Please provide input file");
  process.exit(1);
}

const raw = fs.readFileSync(inputFile, "utf-8");
const data = JSON.parse(raw);

const cleaned = data
  .filter(q => q.question && q.answer)
  .map((q, i) => ({
    id: i + 1,
    question: q.question.trim(),
    answer: q.answer.trim(),
    category: q.category || "OU Football",
    difficulty: q.difficulty || "medium"
  }));

fs.writeFileSync(outputFile, JSON.stringify(cleaned, null, 2));

console.log(`✅ Cleaned trivia saved to ${outputFile}`);
console.log(`Questions: ${cleaned.length}`);

