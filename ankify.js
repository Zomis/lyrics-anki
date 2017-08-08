function clean(string) {
  return string.replace(/[\,\.\'\"\;\!\?]/g, "");
}

function hasValue(element) {
  return typeof element !== "undefined";
}

function unwrapArray(element) {
  return Array.isArray(element) ? element.join(";") : element;
}

function makeCard(params) {
  console.log(params);
  const question = "";
  const answer = [
    params.translationLine,
    params.lyricsLine,
    params.partTranslation,
    params.partLines
  ]
    .map(unwrapArray)
    .find(hasValue);
  return question + "," + answer;
}

function ankify(lyrics, translation) {
  if (typeof translation === "undefined" || translation === null) {
    translation = "";
  }
  lyrics = lyrics.split("\n").map(line => line.trim());
  translation = translation.split("\n").map(line => line.trim());
  if (translation.length > 0 && translation.length != lyrics.length) {
    throw "Translation must have the same amount of lines as lyrics";
  }
  let result = [];

  const useTranslation = translation.length > 0 && translation[0].length > 0;

  let part = 1;
  let lineInPart = 1;
  let partLines = [];
  let partTranslation = [];
  for (let i = 0; i < lyrics.length; i++) {
    const lyricsLine = clean(lyrics[i]);
    const translationLine = clean(translation[i]);

    if (lyrics[i].length === 0) {
      if (useTranslation && translationLine.length > 0) {
        throw "Translation line found for line without lyrics on line " +
          i +
          ". Translation: " +
          translationLine;
      }
      part++;
      lineInPart = 1;
      if (partLines.length > 0) {
        result.push(makeCard({ part: part, partLines: partLines }));
        result.push(
          makeCard({
            part: part,
            partLines: partLines,
            partTranslation: partTranslation
          })
        );
      }
      partLines = [];
      partTranslation = [];
    } else {
      if (useTranslation && translationLine.length === 0) {
        throw "No translation line found for line with lyrics on line " + i;
      }
      lineInPart++;

      result.push(
        makeCard({
          part: part,
          lineInPart: lineInPart,
          partLines: partLines,
          lyricsLine: lyricsLine
        })
      );
      if (useTranslation) {
        result.push(
          makeCard({
            part: part,
            lineInPart: lineInPart,
            partLines: partLines,
            partTranslation: partTranslation,
            lyricsLine: lyricsLine,
            translationLine: translationLine
          })
        );
      }
      partLines.push(lyricsLine);
      if (useTranslation) {
        partTranslation.push(translationLine);
      }
    }
  }

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
