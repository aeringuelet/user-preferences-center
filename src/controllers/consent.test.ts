import { describe, expect, it, vi } from 'vitest';
import { InMemoryEventBus } from '../events/InMemoryEventBus';
import { ConsentChangeEventStore } from '../infrastructure/ConsentChangeEventStore';
import { ConsentStore } from '../infrastructure/ConsentStore';
import { ConsentService } from '../services/ConsentService';
import { consentController } from './Consent';
import { superTestServer } from './utils/SuperTestServer';

describe('consentController', () => {
    describe('POST consent', () => {
        const [, server] = make();

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

    describe('GET consent changes', () => {
        const [{ consentChangeEventStore }, server] = make();

        it('should return empty array if no consent changes', async () => {
            const res = await server.get('/consent/changes/1');

            expect(res.status).toEqual(200);
            expect(res.body).toEqual({ ok: true, consents: [] });
        });

        it('should return consent changes', async () => {
            const now = new Date();
            const consent = {
                id: 1,
                userId: 1,
                type: 'email_notifications' as const,
                value: false,
                timestamp: now,
            };

            const consentChangeEventStoreGetByUserIdSpy = vi.spyOn(
                consentChangeEventStore,
                'getByUserId'
            );
            consentChangeEventStoreGetByUserIdSpy.mockReturnValue(
                Promise.resolve([consent])
            );

            const res = await server.get('/consent/changes/1');

            expect(res.status).toEqual(200);
            expect(res.body).toEqual({
                ok: true,
                consents: [
                    {
                        id: 1,
                        userId: 1,
                        type: 'email_notifications',
                        value: false,
                        timestamp: now.toISOString(),
                    },
                ],
            });
        });
    });
});

function make() {
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

    const server = superTestServer('/consent', consentController(services));

    return [{ consentChangeEventStore, consentStore }, server] as const;
}
