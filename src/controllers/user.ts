import { Router } from 'express';
import { Services } from '../services';

export const userController = (services: Pick<Services, 'userService'>) => {
    const router = Router();

    router.get('/:id', async (req, res) => {
        try {
            const userId = Number(req.params.id);

            const user = await services.userService.getById(userId);
            if (user === null) {
                res.status(404).json({ ok: false, message: 'User not found' });
                return;
            }

            res.status(200).json({ ok: true, user });
        } catch (e) {
            console.log(e);
            res.status(500).json({ ok: false, message: e });
        }
    });

    router.post('/', async (req, res) => {
        try {
            if (!req.body?.user.email) {
                res.status(400).json({
                    ok: false,
                    message: 'Email is required',
                });
                return;
            }

            const user = await services.userService.create(req.body.user);

            res.status(201).json({ ok: true, user });
        } catch (e) {
            console.log(e);
            res.status(500).json({ ok: false, message: e });
        }
    });

    return router;
};
