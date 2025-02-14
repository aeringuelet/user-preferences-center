import { Express, Router } from 'express';
import { userRoutes } from './user';

export const createRoutes = (app: Express) => {
    const router = Router();

    app.use('/user', userRoutes(router));
};
