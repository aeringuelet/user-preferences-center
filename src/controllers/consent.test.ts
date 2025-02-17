import bodyParser from 'body-parser';
import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { InMemoryEventBus } from '../events/InMemoryEventBus';
import { ConsentChangeEventStore } from '../infrastructure/ConsentChangeEventStore';
import { ConsentStore } from '../infrastructure/ConsentStore';
import { ConsentService } from '../services/ConsentService';
import { consentController } from './consent';

describe('consentController', () => {
    describe('create consent', () => {
        const [, , , server] = make();

        it('should emit event to event bus', async () => {
            const res = await server.post('/consent').send({
                consent: {
                    userId: 1,
                    type: 'email_notifications',
                    value: false,
                },
            });

            expect(res.status).toEqual(201);
            expect(res.body).toEqual({ ok: true });
        });

        it('should fail if no consent in body', async () => {
            const res = await server.post('/consent').send({});

            expect(res.status).toBe(400);
            expect(res.body).toEqual({
                ok: false,
                message: expect.any(String),
            });
        });
    });
});

function make() {
    const app = express();
    app.use(bodyParser.json());

    const consentStore: ConsentStore = {
        upsert: async (consent) => {
            return { id: 1, ...consent };
        },
    };
    const consentChangeEventStore: ConsentChangeEventStore = {
        create: async (_) => void 0,
        getByUserId: async (_) => {
            return [];
        },
    };

    const eventBus = InMemoryEventBus();

    const services = {
        consentService: ConsentService(
            consentStore,
            consentChangeEventStore,
            eventBus
        ),
    };
    app.use('/consent', consentController(services));

    const server = request(app);

    return [
        eventBus,
        { consentChangeEventStore, consentStore },
        services,
        server,
    ] as const;
}
