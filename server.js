const express = require('express');
const app = express();
const fs = require('fs');

app.listen(3000);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/posts', (req, res) => {
  const blogFile = fs.readFileSync('./assets/posts.json', 'utf8');
  res.send(blogFile);
});
const blogFile = fs.readFileSync('./assets/posts.json', 'utf8');
