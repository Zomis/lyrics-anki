function clean(string) {
  return string.replace(/[\,\.\'\"\;\!\?]/g, "");
}

function unwrapArray(element) {
  return Array.isArray(element) ? element.join("<br>") : element;
}

function makeCard(params) {
  console.log(params);
  const question = params.question;
  const answer = unwrapArray(params.answer);
  return question + "," + answer;
}

function turnIntoParts(lines) {
  let parts = [];
  let part = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.length === 0) {
      if (part.length > 0) {
        parts.push(part);
        part = [];
      }
    } else {
      part.push(line);
    }
  }
  if (part.length > 0) {
    parts.push(part);
    part = [];
  }
  return parts;
}

function ankify(lyrics, translation) {
  if (typeof translation === "undefined" || translation === null) {
    translation = "";
  }
  lyrics = lyrics.split("\n").map(line => line.trim());
  translation = translation.split("\n").map(line => line.trim());

  lyricParts = turnIntoParts(lyrics);
  translationParts = turnIntoParts(translation);
  const useTranslation = translationParts.length > 0;
  if (useTranslation) {
    if (lyricParts.length != translationParts.length) {
      throw "Lyric parts " +
        lyricParts.length +
        " does not match translation parts " +
        translationParts.length;
    }
    for (let i = 0; i < lyricParts.length; i++) {
      if (lyricParts[i].length != translationParts[i].length) {
        throw "Part " + i + " length does not match";
      }
    }
  }

  let result = [];
  for (let i = 0; i < lyricParts.length; i++) {
    // loop through parts
    const lyricPart = lyricParts[i].map(clean);
    const translationPart = useTranslation
      ? translationParts[i].map(clean)
      : [];
    console.log("Lyrics: " + lyricPart);
    console.log("Translation: " + translationPart);

    for (let li = 0; li < lyricPart.length; li++) {
      const lyricsLine = lyricPart[li];
      const translationLine = translationPart[li];
      const previousLine = lyricPart[i - 1];
      const nextLine = lyricPart[i + 1];
      result.push(
        makeCard({
          question: "Lyrics for part " + i + " line " + li,
          answer: lyricsLine
        })
      );
      if (useTranslation) {
        result.push(
          makeCard({
            question: "Translation for '" + lyricsLine + "'",
            answer: translationLine
          })
        );
      }
    }
    result.push(makeCard({ question: "Part " + i, answer: lyricPart }));
  }
  return result.join("\n");
}

const fs = require("fs");

if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}

const filename = process.argv[2];

const lyricsText = fs.readFileSync(filename, "utf8");
console.log("Using lyrics file: " + filename);

let translationText = null;

if (process.argv.length > 3) {
  const filenameTranslation = process.argv[3];
  console.log("Using translation file: " + filenameTranslation);
  translationText = fs.readFileSync(filenameTranslation, "utf8");
}

const resultText = ankify(lyricsText, translationText);
console.log();
console.log("Result:");
console.log(resultText);
fs.writeFile(filename + ".anki.csv", resultText, err => {
  if (err) {
    throw err;
  }
  console.log("Done!");
});
