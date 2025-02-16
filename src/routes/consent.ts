import { Router } from 'express';
import { Services } from '../services';

export const consentRoutes = (services: Services) => {
    const router = Router();

    router.post('/', async (req, res) => {
        if (!req.body.consent) {
            res.status(400).json({
                ok: false,
                message: 'Both the userId and consent are required',
            });
            return;
        }

        services.consentService.createOrUpdate(req.body.consent);

        res.status(201).json({ ok: true });
    });

    router.get('/changes/:userId', async (req, res) => {
        const userId = Number(req.params.userId);

        const consents =
            await services.consentService.getConsentChangesByUserId(userId);

        res.status(200).json({ ok: true, consents });
    });

    return router;
};
