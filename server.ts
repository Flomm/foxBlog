import Postable from './Backend/Postable';
import * as express from 'express';
import { connection } from './Backend/sqlConnect';

const app = express();
app.listen(8000, () => {
  console.log('App is listening on port 8000');
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/assets', express.static('assets'));
app.use('/Frontend', express.static('Frontend'));

connection.connect((err: Error) => {
  if (err) {
    throw err;
  }
  console.log('Connected to DB');
});

app.get('/', (req: express.Request, res: express.Response) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/posts', (req: express.Request, res: express.Response) => {
  connection.query('SELECT author, title, content, date FROM posts', (err: Error, result) => {
    if (err) {
      return console.error(err);
    }
    const posts: Postable[] = result;
    res.send(posts);
  });
});

app.post('/api/addpost', (req: express.Request, res: express.Response) => {
  const newPost: Postable = req.body;
  connection.query('INSERT INTO posts SET ?;', newPost, (err: Error, result) => {
    if (err) {
      res.status(404).send();
      return console.error(err);
    }
    res.status(202).send();
  });
});
