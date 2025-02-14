import { PrismaClient } from '@prisma/client';
import express from 'express';
import { createStores } from './infrastructure/stores';
import { initializeRoutes } from './routes';
import { createServices } from './services/services';
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const prisma = new PrismaClient();

const stores = createStores(prisma);
const services = createServices(stores);
// maybe rename to controllers ?
initializeRoutes(app, services);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
