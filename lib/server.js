import app from '../app.js';
import { config } from 'dotenv';

config();
const { PORT } = process.env;

const normalizePort = val => {
  const port = parseInt(val, 10);
  return isNaN(port) ? val : port >= 0 ? port : false;
};

const createServer = async () => {
  const port = normalizePort(PORT || '5001');
  app.set('port', port);

  app.listen(port);
  console.log(`Listening on ${port}`);
};

export default createServer;
