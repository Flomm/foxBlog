import Postable from './Backend/Postable';
import * as express from 'express';
import { connection } from './Backend/sqlConnect';

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

app.get('/api/login', (req: express.Request, res: express.Response) => {
  const userName: string = req.headers.user as string;
  connection.query('SELECT user_name FROM users WHERE user_name=?', userName, (err: Error, result) => {
    if (err) {
      res.sendStatus(404);
      return console.error(err);
    }
    if (result.length === 0) {
      console.log('pp');
      res.sendStatus(401);
    } else {
      res.sendStatus(200);
    }
  });
});

//Getposts
app.get('/api/posts', (req: express.Request, res: express.Response) => {
  connection.query('SELECT * FROM posts', (err: Error, result) => {
    if (err) {
      return console.error(err);
    }
    const posts: Postable[] = result;
    res.send(posts);
  });
});

app.get('/api/posts/myPosts', (req: express.Request, res: express.Response) => {
  const userName: string = req.headers.user as string;
  connection.query('SELECT * FROM posts WHERE author = ?', userName, (err: Error, result) => {
    if (err) {
      return console.error(err);
    }
    const posts: Postable[] = result;
    res.send(posts);
  });
});

//Addpost
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

// app.get('/api/posts/myPosts', (req: express.Request, res: express.Response) => {
//   const userName = req.headers.user;
//   if (userName) {
//     connection.query('SELECT * FROM posts WHERE isDeleted = 0 and owner= ?', userName, (err: Error, result) => {
//       if (err) {
//         res.sendStatus(400);
//         return console.error(err);
//       }
//       const body: ISendData[] = result;
//       res.status(200).send(body);
//     });
//   } else {
//     res.sendStatus(400);
//   }
// });
// //Post
// app.post('/api/posts', (req: express.Request, res: express.Response) => {
//   const userName: string = req.headers.user as string;
//   const newData: IPostData = req.body;
//   const newPost: NewPost = createNewPost(newData, userName);
//   connection.query('INSERT INTO posts SET ?;', newPost, (err: Error, result) => {
//     if (err) {
//       res.sendStatus(400);
//       return console.error(err);
//     }
//     const newId: number = result.insertId;
//     connection.query('SELECT * FROM posts WHERE id = ?', newId, (err: Error, result) => {
//       if (err) {
//         res.sendStatus(400);
//         return console.error(err);
//       }
//       const post: ISendData = result[0];
//       res.status(200).send(post);
//     });
//   });
// });
// //Upvote
// app.put('/api/posts/:id/upvote', (req: express.Request, res: express.Response) => {
//   const postID = req.params.id;
//   const userName: string = req.headers.user as string;
//   connection.query(
//     'SELECT * FROM VOTES WHERE CONCAT(post_id, user)= ?',
//     `${postID}${userName}`,
//     (err: Error, result) => {
//       if (err) {
//         res.sendStatus(400);
//         return console.error(err);
//       }
//       if (!result[0]) {
//         const newVote: NewVote = {
//           post_id: parseInt(postID),
//           user: userName,
//           vote: 1,
//         };
//         connection.query(
//           `INSERT INTO VOTES SET ?; UPDATE posts SET score = score + 1 WHERE id = ${postID}`,
//           newVote,
//           (err: Error, result) => {
//             if (err) {
//               res.status(400).send(err);
//             }
//             connection.query(
//               `SELECT posts.id, title, url, timestamp, score, owner, vote FROM posts INNER JOIN votes ON id = post_id INNER JOIN users ON user_name = user WHERE posts.id=? and user='${userName}' and isDeleted = 0`,
//               postID,
//               (err: Error, result) => {
//                 if (err) {
//                   res.status(400).send(err);
//                   return;
//                 }
//                 const response: ISendData = result;
//                 res.status(200).json(response);
//               }
//             );
//           }
//         );
//       } else {
//         const vote: number = result[0].vote;
//         let setVote: SetVoteScore;
//         if (vote === 1) {
//           setVote = {
//             setVote: 0,
//             setScore: -1,
//           };
//         } else if (vote === 0) {
//           setVote = {
//             setVote: 1,
//             setScore: 1,
//           };
//         } else if (vote === -1) {
//           setVote = {
//             setVote: 1,
//             setScore: 2,
//           };
//         }
//         connection.query(
//           `UPDATE votes SET vote = ${setVote.setVote} WHERE CONCAT(post_id, user)= ?; UPDATE posts SET score = score + ${setVote.setScore} WHERE id = ${postID}`,
//           `${postID}${userName}`,
//           (err: Error, result) => {
//             if (err) {
//               res.status(400).send(err);
//               return;
//             }
//             connection.query(
//               `SELECT posts.id, title, url, timestamp, score, owner, vote FROM posts INNER JOIN votes ON id = post_id INNER JOIN users ON user_name = user WHERE posts.id=? and user='${userName}' and isDeleted = 0`,
//               postID,
//               (err: Error, result) => {
//                 if (err) {
//                   res.status(400).send(err);
//                   return;
//                 }
//                 const response: ISendData = result;
//                 res.status(200).json(response);
//               }
//             );
//           }
//         );
//       }
//     }
//   );
// });

// app.put('/api/posts/:id/downvote', (req: express.Request, res: express.Response) => {
//   const postID = req.params.id;
//   const userName: string = req.headers.user as string;
//   connection.query(
//     'SELECT * FROM VOTES WHERE CONCAT(post_id, user)= ?',
//     `${postID}${userName}`,
//     (err: Error, result) => {
//       if (err) {
//         res.sendStatus(400);
//         return console.error(err);
//       }
//       if (!result[0]) {
//         const newVote: NewVote = {
//           post_id: parseInt(postID),
//           user: userName,
//           vote: -1,
//         };
//         connection.query(
//           `INSERT INTO VOTES SET ?; UPDATE posts SET score = score - 1 WHERE id = ${postID}`,
//           newVote,
//           (err: Error, result) => {
//             if (err) {
//               res.status(400).send(err);
//             }
//             connection.query(
//               `SELECT posts.id, title, url, timestamp, score, owner, vote FROM posts INNER JOIN votes ON id = post_id INNER JOIN users ON user_name = user WHERE posts.id=? and user='${userName}' and isDeleted = 0`,
//               postID,
//               (err: Error, result) => {
//                 if (err) {
//                   res.status(400).send(err);
//                   return;
//                 }
//                 const response: ISendData = result;
//                 res.status(200).json(response);
//               }
//             );
//           }
//         );
//       } else {
//         const vote: number = result[0].vote;
//         let setVote: SetVoteScore;
//         if (vote === 1) {
//           setVote = {
//             setVote: 0,
//             setScore: -1,
//           };
//         } else if (vote === 0) {
//           setVote = {
//             setVote: -1,
//             setScore: -1,
//           };
//         } else if (vote === -1) {
//           setVote = {
//             setVote: 0,
//             setScore: 1,
//           };
//         }
//         connection.query(
//           `UPDATE votes SET vote = ${setVote.setVote} WHERE CONCAT(post_id, user)= ?; UPDATE posts SET score = score + ${setVote.setScore} WHERE id = ${postID}`,
//           `${postID}${userName}`,
//           (err: Error, result) => {
//             if (err) {
//               res.status(400).send(err);
//               return;
//             }
//             connection.query(
//               `SELECT posts.id, title, url, timestamp, score, owner, vote FROM posts INNER JOIN votes ON id = post_id INNER JOIN users ON user_name = user WHERE posts.id=? and user='${userName}' and isDeleted = 0`,
//               postID,
//               (err: Error, result) => {
//                 if (err) {
//                   res.status(400).send(err);
//                   return;
//                 }
//                 const response: ISendData = result;
//                 res.status(200).json(response);
//               }
//             );
//           }
//         );
//       }
//     }
//   );
// });
// //Update title
// app.put('/api/posts/:id', (req: express.Request, res: express.Response) => {
//   const postID: string = req.params.id;
//   const rbody: IPostData = req.body;
//   connection.query(`UPDATE posts SET title = '${rbody.title}' WHERE id = ?`, postID, (err: Error, result) => {
//     if (err) {
//       res.sendStatus(400);
//       return console.error(err);
//     }
//     if (result.affectedRows === 0) return res.sendStatus(400);
//     connection.query('SELECT * FROM posts WHERE id = ?', postID, (err: Error, result) => {
//       if (err) {
//         res.sendStatus(400);
//         return console.error(err);
//       }
//       const post: ISendData = result[0];
//       res.status(200).send(post);
//     });
//   });
// });
// //Delete
// app.delete('/api/posts/:id', (req: express.Request, res: express.Response) => {
//   const idToDel: string = req.params.id;
//   connection.query('UPDATE posts SET isDeleted = 1 WHERE id = ?', idToDel, (err: Error, result) => {
//     if (err) {
//       res.sendStatus(400);
//       return console.error(err);
//     }
//     if (result.affectedRows === 0) return res.sendStatus(400);
//     connection.query('SELECT * FROM posts WHERE id = ?', idToDel, (err: Error, result) => {
//       if (err) {
//         res.sendStatus(400);
//         return console.error(err);
//       }
//       const post: ISendData = result[0];
//       res.status(200).send(post);
//     });
//   });
// });
