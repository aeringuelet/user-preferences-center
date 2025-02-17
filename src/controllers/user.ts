import { Router } from 'express';
import { Services } from '../services';

export const userController = (services: Services) => {
    const router = Router();

    router.get('/:id', async (req, res) => {
        const userId = Number(req.params.id);

        const user = await services.userService.getById(userId);
        if (user === null) {
            res.status(404).json({ ok: false, message: 'User not found' });
            return;
        }

        res.status(200).json({ ok: true, user });
    });

    router.post('/', async (req, res) => {
        if (!req.body.email) {
            res.status(400).json({ ok: false, message: 'Email is required' });
            return;
        }

        const user = await services.userService.create(req.body);

        res.status(201).json({ ok: true, user });
    });

    return router;
};
