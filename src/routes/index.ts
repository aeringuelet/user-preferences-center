import { Express, Router } from 'express';
import { Services } from '../services/services';
import { userRoutes } from './user';

export const initializeRoutes = (app: Express, services: Services) => {
    const router = Router();

    app.use('/user', userRoutes(router, services));
};
