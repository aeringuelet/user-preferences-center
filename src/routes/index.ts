import { Express } from 'express';
import { Services } from '../services/services';
import { consentRoutes } from './consent';
import { userRoutes } from './user';

export const initializeRoutes = (app: Express, services: Services) => {
    app.use('/user', userRoutes(services));
    app.use('/consent', consentRoutes(services));
};
