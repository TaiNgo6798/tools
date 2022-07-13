const fs = require("fs");

const writeResult = (data, name) => {
  fs.writeFileSync(`./results/${name}.json`, JSON.stringify(data));
};

module.exports = { writeResult };
