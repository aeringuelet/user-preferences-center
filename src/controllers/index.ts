import { Express } from 'express';
import { Services } from '../services';
import { consentController } from './consent';
import { userController } from './user';

export const initializeControllers = (app: Express, services: Services) => {
    app.use('/user', userController(services));
    app.use('/consent', consentController(services));
};
