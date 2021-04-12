import { connection } from './Backend/sqlConnect';
import { app } from './routes';

const port: number = 8000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

connection.connect((err: Error) => {
  if (err) {
    throw err;
  }
  console.log('Connected to DB');
});
