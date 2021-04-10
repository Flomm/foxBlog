import IPostable from './Backend/IPostable';
import AccData from './Backend/IAccData';
import Vote from './Backend/IVote';
import SetVoteScore from './Backend/ISetVoteScore';
import { connection } from './Backend/sqlConnect';
import countScore from './Backend/countScore';
import Postable from './Frontend/tsFiles/Interfaces/IPostable';
import * as express from 'express';

const app = express();
const port: number = 8000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/assets', express.static('assets'));
app.use('/Frontend', express.static('Frontend'));
app.use('/api', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  req.accepts('application/json');
  res.setHeader('Content-Type', 'application/json');
  next();
});

connection.connect((err: Error) => {
  if (err) {
    throw err;
  }
  console.log('Connected to DB');
});

//Anchors
app.get('/', (req: express.Request, res: express.Response) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/visitor', (req: express.Request, res: express.Response) => {
  res.sendFile(__dirname + '/visitor.html');
});

app.get('/profile', (req: express.Request, res: express.Response) => {
  res.sendFile(__dirname + '/profile.html');
});
//Login
app.get('/api/login', (req: express.Request, res: express.Response) => {
  const userName: string = req.headers.user as string;
  const pw: string = req.headers.password as string;
  connection.query('SELECT user_name, pw FROM users WHERE user_name=?', userName, (err: Error, result) => {
    if (err) {
      res.sendStatus(500);
      return console.error(err);
    }
    if (result.length === 0 || result[0].pw !== pw) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});
//Getposts
app.get('/api/posts/visitor', (req: express.Request, res: express.Response) => {
  connection.query(
    'SELECT posts.id, title, content, timestamp, score, user_name as author FROM posts  INNER JOIN users ON users.id = posts.author_id WHERE is_deleted = 0',
    (err: Error, result: IPostable[]) => {
      if (err) {
        res.sendStatus(500);
        return console.error(err);
      }
      res.send(result);
    }
  );
});
//Get all for votes
app.get('/api/posts', (req: express.Request, res: express.Response) => {
  const userName: string = req.headers.user as string;
  connection.query(
    'SELECT posts.id, title, content, timestamp, score, user_name as author, vote FROM posts LEFT JOIN users ON users.id = posts.author_id LEFT JOIN votes ON posts.id = votes.post_id AND user=? WHERE is_deleted = 0',
    userName,
    (err: Error, result: IPostable[]) => {
      if (err) {
        res.sendStatus(500);
        return console.error(err);
      }
      res.send(result);
    }
  );
});
//Get my posts
app.get('/api/posts/myPosts', (req: express.Request, res: express.Response) => {
  const userName: string = req.headers.user as string;
  connection.query('SELECT id FROM users WHERE user_name=?', userName, (err: Error, result) => {
    if (err) {
      res.sendStatus(500);
      return console.error(err);
    }
    if (!result[0]) {
      return res.sendStatus(400);
    }
    const userId: string = result[0].id as string;
    connection.query(
      'SELECT posts.id, title, content, timestamp, score, user_name as author FROM posts INNER JOIN users ON users.id = posts.author_id  WHERE author_id = ? AND is_deleted=0',
      userId,
      (err: Error, result: IPostable[]) => {
        if (err) {
          res.sendStatus(500);
          return console.error(err);
        }
        if (result.length === 0) {
          res.sendStatus(400);
          return;
        }
        res.status(200).send(result);
      }
    );
  });
});
//Get single post
app.get('/api/singlePost/:id', (req: express.Request, res: express.Response) => {
  const userName: string = req.headers.user as string;
  connection.query('SELECT id FROM users WHERE user_name=?', userName, (err: Error, result) => {
    if (err) {
      res.sendStatus(500);
      return console.error(err);
    }
    if (!result[0]) {
      return res.sendStatus(400);
    }
    const userId: string = result[0].id as string;
    connection.query('SELECT * FROM posts WHERE id = ?', req.params.id, (err: Error, result: IPostable[]) => {
      if (err) {
        res.sendStatus(500);
        return console.error(err);
      }
      if (userId !== result[0].author_id.toString()) {
        return res.sendStatus(400);
      }
      res.status(200).send(result[0]);
    });
  });
});
//Get acc. info
app.get('/api/info', (req: express.Request, res: express.Response) => {
  const userName: string = req.headers.user as string;
  connection.query('SELECT id FROM users WHERE user_name=?', userName, (err: Error, result) => {
    if (err) {
      res.sendStatus(500);
      return console.error(err);
    }
    if (!result[0]) {
      return res.sendStatus(400);
    }
    const userId: string = result[0].id as string;
    connection.query(
      'SELECT id, score FROM posts WHERE author_id = ? AND is_deleted=0',
      userId,
      (err: Error, result) => {
        if (err) {
          res.sendStatus(500);
          return console.error(err);
        }
        const resObject: AccData = {
          numOfPosts: result.length.toString(),
          sumScore: countScore(result).toString(),
        };
        res.status(200).send(resObject);
      }
    );
  });
});
//Delete
app.delete('/api/posts/:id', (req: express.Request, res: express.Response) => {
  const idToDel: string = req.params.id;
  connection.query('UPDATE posts SET is_deleted = 1 WHERE id = ?', idToDel, (err: Error, result) => {
    if (err) {
      res.sendStatus(500);
      return console.error(err);
    }
    if (result.affectedRows === 0) {
      res.sendStatus(400);
      return;
    }
    res.sendStatus(200);
  });
});
//Addpost
app.post('/api/addpost', (req: express.Request, res: express.Response) => {
  const newPost: IPostable = req.body;
  connection.query('INSERT INTO posts SET ?;', newPost, (err: Error, result) => {
    if (err) {
      res.status(500).send();
      return console.error(err);
    }
    const newId: number = result.insertId;
    connection.query('SELECT * FROM posts WHERE id=?;', newId, (err: Error, result: Postable[]) => {
      if (err) {
        res.status(500).send();
        return console.error(err);
      }
      res.status(202).send(result[0]);
    });
  });
});
//Upvote
app.put('/api/posts/:id/upvote', (req: express.Request, res: express.Response) => {
  const postID = req.params.id;
  const userName: string = req.headers.user as string;
  connection.query('SELECT * FROM POSTS WHERE id= ?', parseInt(postID), (err: Error, result) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    if (!result[0]) {
      return res.sendStatus(400);
    } else {
      connection.query(
        'SELECT * FROM VOTES WHERE CONCAT(post_id, user)= ?',
        `${postID}${userName}`,
        (err: Error, result) => {
          if (err) {
            res.sendStatus(500);
            return console.error(err);
          }
          if (!result[0]) {
            const newVote: Vote = {
              post_id: parseInt(postID),
              user: userName,
              vote: 1,
            };
            connection.query(
              `INSERT INTO VOTES SET ?; UPDATE posts SET score = score + 1 WHERE id = ${postID}`,
              newVote,
              (err: Error, result) => {
                if (err) {
                  res.status(500).send(err);
                  return;
                }
                connection.query(
                  `SELECT  posts.id, title, content, timestamp, score, vote FROM posts INNER JOIN votes ON id = post_id INNER JOIN users ON user_name = user WHERE posts.id=? and user='${userName}' and is_deleted = 0`,
                  postID,
                  (err: Error, result: IPostable[]) => {
                    if (err) {
                      res.status(500).send(err);
                      return;
                    }
                    res.status(200).json(result[0]);
                    return;
                  }
                );
              }
            );
          } else {
            const vote: number = result[0].vote;
            let setVote: SetVoteScore;
            if (vote === 1) {
              setVote = {
                setVote: 0,
                setScore: -1,
              };
            } else if (vote === 0) {
              setVote = {
                setVote: 1,
                setScore: 1,
              };
            } else if (vote === -1) {
              setVote = {
                setVote: 1,
                setScore: 2,
              };
            }
            connection.query(
              `UPDATE votes SET vote = ${setVote.setVote} WHERE CONCAT(post_id, user)= ?; UPDATE posts SET score = score + ${setVote.setScore} WHERE id = ${postID}`,
              `${postID}${userName}`,
              (err: Error, result) => {
                if (err) {
                  res.status(500).send(err);
                  return;
                }
                connection.query(
                  `SELECT  posts.id, title, content, timestamp, score, vote FROM posts INNER JOIN votes ON id = post_id INNER JOIN users ON user_name = user WHERE posts.id=? and user='${userName}' and is_deleted = 0`,
                  postID,
                  (err: Error, result: IPostable[]) => {
                    if (err) {
                      res.status(500).send(err);
                      return;
                    }
                    res.status(200).json(result[0]);
                  }
                );
              }
            );
          }
        }
      );
    }
  });
});

app.put('/api/posts/:id/downvote', (req: express.Request, res: express.Response) => {
  const postID = req.params.id;
  const userName: string = req.headers.user as string;
  connection.query('SELECT * FROM POSTS WHERE id= ?', parseInt(postID), (err: Error, result) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    if (!result[0]) {
      return res.sendStatus(400);
    } else {
      connection.query(
        'SELECT * FROM VOTES WHERE CONCAT(post_id, user)= ?',
        `${postID}${userName}`,
        (err: Error, result) => {
          if (err) {
            res.sendStatus(500);
            return console.error(err);
          }
          if (!result[0]) {
            const newVote: Vote = {
              post_id: parseInt(postID),
              user: userName,
              vote: -1,
            };
            connection.query(
              `INSERT INTO VOTES SET ?; UPDATE posts SET score = score - 1 WHERE id = ${postID}`,
              newVote,
              (err: Error, result) => {
                if (err) {
                  res.status(500).send(err);
                }
                connection.query(
                  `SELECT  posts.id, title, content, timestamp, score, vote FROM posts INNER JOIN votes ON id = post_id INNER JOIN users ON user_name = user WHERE posts.id=? and user='${userName}' and is_deleted = 0`,
                  postID,
                  (err: Error, result: IPostable[]) => {
                    if (err) {
                      res.status(500).send(err);
                      return;
                    }
                    res.status(200).json(result[0]);
                  }
                );
              }
            );
          } else {
            const vote: number = result[0].vote;
            let setVote: SetVoteScore;
            if (vote === 1) {
              setVote = {
                setVote: 0,
                setScore: -1,
              };
            } else if (vote === 0) {
              setVote = {
                setVote: -1,
                setScore: -1,
              };
            } else if (vote === -1) {
              setVote = {
                setVote: 0,
                setScore: 1,
              };
            }
            connection.query(
              `UPDATE votes SET vote = ${setVote.setVote} WHERE CONCAT(post_id, user)= ?; UPDATE posts SET score = score + ${setVote.setScore} WHERE id = ${postID}`,
              `${postID}${userName}`,
              (err: Error, result) => {
                if (err) {
                  res.status(500).send(err);
                  return;
                }
                connection.query(
                  `SELECT  posts.id, title, content, timestamp, score, vote FROM posts INNER JOIN votes ON id = post_id INNER JOIN users ON user_name = user WHERE posts.id=? and user='${userName}' and is_deleted = 0`,
                  postID,
                  (err: Error, result: IPostable[]) => {
                    if (err) {
                      res.status(500).send(err);
                      return;
                    }
                    res.status(200).json(result[0]);
                  }
                );
              }
            );
          }
        }
      );
    }
  });
});
