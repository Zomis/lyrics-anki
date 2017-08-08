const fs = require("fs");

if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}

const filename = process.argv[2];
if (process.argv.length >= 3) {
  const filename2 = process.argv[3];
}

fs.readFile(filename, "utf8", function(err, data) {
  if (err) throw err;
  console.log("OK: " + filename);
  console.log(data);
});
