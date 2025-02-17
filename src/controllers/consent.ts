import { Router } from 'express';
import { Services } from '../services';

export const consentController = (
    services: Pick<Services, 'consentService'>
) => {
    const router = Router();

    router.post('/', async (req, res) => {
        try {
            if (!req.body.consent) {
                res.status(400).json({
                    ok: false,
                    message: 'Both the userId and consent are required',
                });
                return;
            }

            services.consentService.createOrUpdate(req.body.consent);

            res.status(201).json({ ok: true });
        } catch (e) {
            console.log(e);
            res.status(500).json({ ok: false, message: e });
        }
    });

    router.get('/changes/:userId', async (req, res) => {
        try {
            const userId = Number(req.params.userId);

            const consents =
                await services.consentService.getConsentChangesByUserId(userId);

            res.status(200).json({ ok: true, consents });
        } catch (e) {
            console.log(e);
            res.status(500).json({ ok: false, message: e });
        }
    });

    return router;
};
