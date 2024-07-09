import express from 'express';
import basicAuth from './middleware/basicAuth';

const app = express();
const port = process.env.PORT || 3000;

app.use(basicAuth);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});