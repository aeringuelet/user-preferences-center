import { type Router } from 'express';
import { Services } from '../services/services';

export const userRoutes = (router: Router, services: Services) => {
    router.get('/:id', async (req, res) => {
        const userId = Number(req.params.id);

        const user = await services.userService.getById(userId);
        if (user === null) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ user });
    });

    router.post('/', async (req, res) => {
        if (!req.body.email) {
            res.status(400).json({ message: 'Email is required' });
            return;
        }

        const user = await services.userService.create(req.body);

        res.status(201).json({ user });
    });

    return router;
};
