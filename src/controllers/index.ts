import { Express } from 'express';
import { Services } from '../services';
import { consentController } from './Consent';
import { userController } from './User';

export const initializeControllers = (app: Express, services: Services) => {
    app.use('/user', userController(services));
    app.use('/consent', consentController(services));
};
