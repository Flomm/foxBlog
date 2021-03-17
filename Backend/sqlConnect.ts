import * as mysql from 'mysql';

export const connection: mysql.Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'blog_posts',
});
