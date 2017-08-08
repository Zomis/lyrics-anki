function ankify(lyrics, translation) {
  if (typeof translation === "undefined" || translation === null) {
    translation = "";
  }
  lyrics = lyrics.split("\n").map(line => line.trim());
  translation = translation.split("\n").map(line => translation.trim());
  if (translation.length > 0 && translation.length != lyrics.length) {
    throw "Translation must have the same amount of lines as lyrics";
  }

  let result = ["Result"];

  return result.join("\n");
}

const fs = require("fs");

if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}

const filename = process.argv[2];

const lyrics = fs.readFileSync(filename, "utf8");
console.log("Using lyrics file: " + filename);

let translation = null;

if (process.argv.length > 3) {
  const filenameTranslation = process.argv[3];
  console.log("Using translation file: " + filenameTranslation);
  translation = fs.readFileSync(filenameTranslation, "utf8");
}

const result = ankify(lyrics, translation);
console.log();
console.log("Result:");
console.log(result);
fs.writeFile(filename + ".anki", result, err => {
  if (err) {
    throw err;
  }
  console.log("Done!");
});
