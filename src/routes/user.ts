import { type Router } from 'express';
import { Services } from '../services/services';

export const userRoutes = (router: Router, services: Services) => {
    router.get('/:id', async (req, res) => {
        const userId = Number(req.params.id);

        const user = await services.userService.getById(userId);
        if (user === null) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    });

    return router;
};
