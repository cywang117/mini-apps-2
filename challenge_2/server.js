const path = require('path')
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/test', (req, res) => {
  res.status(200).send('Test route');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});

