import Postable from './Backend/Postable';
import * as express from 'express';
import * as fs from 'fs';
const app = express();

app.listen(8000, () => {
  console.log('App is listening on port 8000');
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/assets', express.static('assets'));
app.use('/Frontend', express.static('Frontend'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/posts', (req, res) => {
  const blogFile: string = fs.readFileSync('./assets/posts.json', 'utf8');
  res.send(blogFile);
});

app.post('/api/addpost', (req, res) => {
  const newPost: Postable = req.body;
  const blogFileArr: Postable[] = JSON.parse(fs.readFileSync('./assets/posts.json', 'utf8'));
  blogFileArr.push(newPost);
  fs.writeFileSync('./assets/posts.json', JSON.stringify(blogFileArr));
  res.status(202).send();
});
