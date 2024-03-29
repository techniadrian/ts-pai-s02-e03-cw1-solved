import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

const app = express();

const isDev = process.env.NODE_ENV === 'development';

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: !isDev,
    crossOriginResourcePolicy: !isDev,
    frameguard: !isDev,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ name: 'Moje API' });
});

app.get('/healthcheck', (req, res) => {
  res.status(200).json({ status: 'success', timestamp: Date.now() });
});

app.listen(process.env.PORT || 5050, function () {
  const { port } = this.address();
  console.log(`Server listening on port: ${port}`);
  isDev && console.log(`http://localhost:${port}`);
});
