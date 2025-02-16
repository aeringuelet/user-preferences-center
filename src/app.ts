import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import express from 'express';
import { InMemoryEventBus } from './events/InMemoryEventBus';
import { createStores } from './infrastructure/stores';
import { initializeRoutes } from './routes';
import { createServices } from './services/services';
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3001;

const prisma = new PrismaClient();

const eventBus = InMemoryEventBus();
const stores = createStores(prisma);
const services = createServices(eventBus, stores);
// maybe rename to controllers ?
initializeRoutes(app, services);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
