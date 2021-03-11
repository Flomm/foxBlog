const express = require('express');
const app = express();

app.listen(3000);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
