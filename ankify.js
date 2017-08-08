const fs = require("fs");

if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}

const filename = process.argv[2];

const data = fs.readFileSync(filename, "utf8");
console.log("Using lyrics file: " + filename);

const translation = null;

if (process.argv.length > 3) {
  const filenameTranslation = process.argv[3];
  console.log("Using translation file: " + filenameTranslation);
  translation = fs.readFileSync(filenameTranslation, "utf8");
}

fs.writeFile(filename + ".anki", "Result", err => {
  if (err) {
    throw err;
  }
  console.log("Done!");
});
