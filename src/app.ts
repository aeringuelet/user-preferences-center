import express from 'express';
import { createRoutes } from './routes';
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

createRoutes(app);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
