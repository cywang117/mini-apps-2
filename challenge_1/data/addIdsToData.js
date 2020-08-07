const fs = require('fs');
const path = require('path');
const data = require('./db.json');

/**
 * CLI script to add unique ids to each event entry in db.json, for use with PATCH methods
 */
const addIdsToData = () => {
  let id = 1;
  data.events.forEach(event => {
    event.id = id;
    id++;
  });

  const writeStream = fs.createWriteStream(path.resolve(__dirname, 'db.json'));
  writeStream.write(JSON.stringify(data));
  writeStream.end();
}

addIdsToData();
