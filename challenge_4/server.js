const path = require('path');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
});

